import useWindowSize from "../../useResizeWindow";

export default function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  return (
    <div>
      <p>Resize the browser window.</p>
      <p style={{ fontSize: 32, fontWeight: 700 }}>
        {width} × {height}
      </p>
    </div>
  );
}
