import React, { lazy, Suspense } from "react";

import BrowserWindow from "../BrowserWindow/BrowserWindow";

const LazyComponent = lazy(() => import("./LazyComponent"));

export default function LazyLoadWithSuspense() {
  return (
    <BrowserWindow>
      <p>Reload page to see effect</p>
      <h1>Normal Component</h1>

      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyComponent />
      </Suspense>
    </BrowserWindow>
  );
}
