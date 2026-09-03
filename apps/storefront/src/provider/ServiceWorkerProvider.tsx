"use client";

import { useEffect } from "react";

export function ServiceWorkerProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(reg => console.log("Service Worker registered:", reg))
        .catch(err => console.error("SW registration failed:", err));
    }
  }, []);

  return null;
}
