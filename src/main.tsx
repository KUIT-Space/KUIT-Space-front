import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { QueryProvider } from "./apis/query-provider";
import SkeletonDetailPage from "./components/SkeletonDetailPage";
import App from "./App.tsx";

import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryProvider>
    <App />
  </QueryProvider>,
  // </React.StrictMode>,
);
