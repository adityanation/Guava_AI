import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import App from "./App";
import "./styles.css"; // Import Global CSS

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);