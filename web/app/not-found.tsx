import React from "react";

export default function NotFound(): React.JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        background: "#18181b",
        color: "#fff",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, margin: 0 }}>404</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.6 }}>Page not found</p>
      </div>
    </div>
  );
}
