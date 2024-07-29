import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./styles/GlobalStyle.jsx";
import Header from "./components/layout/header.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
