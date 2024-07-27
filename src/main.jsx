import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RestProvider } from "./context/RestContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RestProvider>
        <App />
      </RestProvider>
    </AuthProvider>
  </React.StrictMode>
);
