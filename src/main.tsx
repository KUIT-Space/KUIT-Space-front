import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { QueryProvider } from "./apis/query-provider";
import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Suspense>
        <App />
      </Suspense>
    </QueryProvider>
  </React.StrictMode>,
);
