import { useEffect, useRef, useState } from "react";

const readSize = () => ({ width: window.innerWidth, height: window.innerHeight });

function useWindowSize() {
  const [size, setSize] = useState(readSize);
  const lastRef = useRef(size);
  const rafId = useRef(null);

  useEffect(() => {
    function update() {
      rafId.current = null;

      const { innerWidth: width, innerHeight: height } = window;
      if (lastRef.current.width === width && lastRef.current.height === height) return;

      lastRef.current = { width, height };
      setSize(lastRef.current);
    }

    const onResize = () => {
      if (rafId.current === null) rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, []);

  return size;
}

export default useWindowSize;