import React from "react";

function App() {
  return (
    <main style={styles.page}>
      <h1 style={styles.heading}>Hello, World!</h1>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    background: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "48px",
    margin: 0,
    color: "#111827",
  },
};

export default App;
