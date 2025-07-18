import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

const container = document.getElementById('root');
if (!container) {
  throw new Error("Did not find an element with id 'root'.");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
