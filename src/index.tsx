import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextWrapper from "./context/ContextWrapper";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLInputElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
