import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthContextProvider } from "./context/authContext.js";
import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8800/api/';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
