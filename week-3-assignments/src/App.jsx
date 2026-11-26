import { useEffect, useState } from "react";
import LikeButton from "../LikeButton";
import MortgageCalculator from "../MortgageCalculator";
import MultiStepForm from "../MutliStepForm";
import "../MutliStepForm/styles.css";
import CursorFollowingCircle from "../CursorFollowingCircle";
import WindowSizeDemo from "./demos/WindowSizeDemo.jsx";
import FetchDemo from "./demos/FetchDemo.jsx";

// Hash-based routing (#/like-button) works on any static host without server rewrites.
const ROUTES = [
  { path: "like-button", label: "Like Button", Component: LikeButton },
  { path: "mortgage", label: "Mortgage Calculator", Component: MortgageCalculator },
  { path: "multi-step-form", label: "Multi-Step Form", Component: MultiStepForm },
  { path: "cursor-circle", label: "Cursor Following Circle", Component: CursorFollowingCircle },
  { path: "use-window-size", label: "useWindowSize hook", Component: WindowSizeDemo },
  { path: "use-fetch", label: "useFetch (cached) hook", Component: FetchDemo },
];

const currentPath = () => window.location.hash.replace(/^#\/?/, "") || ROUTES[0].path;

export default function App() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onHash = () => setPath(currentPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const route = ROUTES.find((r) => r.path === path) ?? ROUTES[0];
  const { Component } = route;

  return (
    <div className="layout">
      <nav className="sidebar">
        <h1>Week 3</h1>
        {ROUTES.map((r) => (
          <a key={r.path} href={`#/${r.path}`} className={r === route ? "active" : ""}>
            {r.label}
          </a>
        ))}
      </nav>
      <main className="content">
        <h2 className="page-title">{route.label}</h2>
        {/* key resets component state when switching pages */}
        <Component key={route.path} />
      </main>
    </div>
  );
}
