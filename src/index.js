import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import { AuthContextProvider } from "./contexts/AuthContext";

// styles
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ContextProvider>
          <div style={{ backgroundColor: "#e0e0e0", minHeight: "100vh" }}>
            <App />
          </div>
        </ContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
