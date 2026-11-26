import { useState } from "react";
import { useFetch, clearFetchCache } from "../../useFetchwithCaching";

const BASE = "https://jsonplaceholder.typicode.com/todos/";

function Todo({ url }) {
  const { data, loading, error } = useFetch(url);
  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "crimson" }}>Error: {error.message}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function FetchDemo() {
  const [id, setId] = useState(1);
  const url = BASE + id;
  return (
    <div>
      <p>
        Switch IDs and come back — repeat requests within 2 minutes are served from cache
        (check the Network tab). Two components share the same cache.
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[1, 2, 3, 4].map((n) => (
          <button key={n} onClick={() => setId(n)} disabled={n === id}>
            Todo {n}
          </button>
        ))}
        <button onClick={clearFetchCache}>Clear cache</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Todo url={url} />
        <Todo url={url} />
      </div>
    </div>
  );
}
