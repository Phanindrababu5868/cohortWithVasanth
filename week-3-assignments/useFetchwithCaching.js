// Create a reusable custom hook called useFetch that fetches data from a given URL and returns { data, loading, error }.
// Implement an in-memory caching mechanism such that if the same URL is requested again within 2 minutes, the hook returns cached data instead of making a new API call.
// If the cache has expired (older than 2 minutes), a fresh network request should be made and the cache updated.
// The cache should be shared across multiple components using the hook, not reset on every re-render.

import { useEffect, useState } from "react";

const TTL = 2 * 60 * 1000;
const cache = new Map();    // url -> { data, timestamp }
const inflight = new Map(); // url -> Promise
let generation = 0;         // bumped by clearFetchCache to invalidate pending writes

function getFresh(url) {
  const entry = cache.get(url);
  if (!entry) return null;
  if (Date.now() - entry.timestamp < TTL) return entry;
  cache.delete(url);
  return null;
}

function request(url) {
  if (inflight.has(url)) return inflight.get(url);

  const gen = generation;
  const promise = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (gen === generation) cache.set(url, { data, timestamp: Date.now() });
      return data;
    })
    .finally(() => {
      // Only remove our own entry; a newer request may have replaced it after a clear.
      if (inflight.get(url) === promise) inflight.delete(url);
    });

  inflight.set(url, promise);
  return promise;
}

export function clearFetchCache() {
  generation++;
  cache.clear();
  inflight.clear();
}

// What to show for a URL right now, derived synchronously from the cache.
function snapshot(url) {
  if (!url) return { data: null, loading: false, error: null };
  const hit = getFresh(url);
  return hit
    ? { data: hit.data, loading: false, error: null }
    : { data: null, loading: true, error: null };
}

export function useFetch(url) {
  // State is tagged with the URL it belongs to.
  const [state, setState] = useState(() => ({ url, ...snapshot(url) }));

  useEffect(() => {
    if (!url) return;

    if (getFresh(url)) {
      setState({ url, ...snapshot(url) });
      return;
    }

    let ignore = false;
    setState((s) =>
      s.url === url && s.loading ? s : { url, data: null, loading: true, error: null }
    );

    request(url)
      .then((data) => !ignore && setState({ url, data, loading: false, error: null }))
      .catch((error) => !ignore && setState({ url, data: null, loading: false, error }));

    return () => {
      ignore = true;
    };
  }, [url]);

  // Render-time guard: never expose the previous URL's data for a new URL.
  const visible = state.url === url ? state : { url, ...snapshot(url) };
  return { data: visible.data, loading: visible.loading, error: visible.error };
}