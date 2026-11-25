import React, { useEffect, useRef } from "react";

const RADIUS = 6;

function App() {
  const rafId = useRef(null);
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const paint = () => {
    rafId.current = null;
    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    const x = pos.current.x - rect.left - el.clientLeft - RADIUS*2;
    const y = pos.current.y - rect.top - el.clientTop - RADIUS*2;
    circleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const schedule = () => {
    if (rafId.current === null) rafId.current = requestAnimationFrame(paint);
  };

  const handleMouseEnter = (e) => {
    pos.current = { x: e.clientX, y: e.clientY };
    circleRef.current.style.opacity = 1;
    schedule();
  };

  const handleMouseMove = (e) => {
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
    schedule();
  };

  const handleMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    //   circleRef.current.style.opacity = 0;
      rafId.current = null;
    }
  };

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        border: "2px solid black",
        borderRadius: 12,
        backgroundColor: "grey",
        width: 550,
        height: 600,
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        boxSizing: "border-box",
      }}
    >
      <div
        ref={circleRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: "50%",
          background: "tomato",
          opacity: 0,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export default App;