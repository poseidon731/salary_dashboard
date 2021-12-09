import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SnackbarProvider } from "notistack";
import App from "./App";

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
