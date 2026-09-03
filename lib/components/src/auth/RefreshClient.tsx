"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Session from "supertokens-web-js/recipe/session";
import { LoadingWithGif } from "../minor/Loading";
import { ErrorPage } from "../module/ErrorPage";

export const TryRefreshComponent = () => {
  const router = useRouter();
  const [didError, setDidError] = useState(false);

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("has_refreshed_session");
    if (hasRefreshed) {
      // If we already refreshed and are back here, SSR session is STILL failing.
      sessionStorage.removeItem("has_refreshed_session");
      void Session.signOut().finally(() => {
        window.location.href = "/auth";
      });
      return;
    }

    void Session.attemptRefreshingSession()
      .then(hasSession => {
        if (hasSession) {
          sessionStorage.setItem("has_refreshed_session", "true");
          router.refresh();
        } else {
          window.location.href = "/auth";
        }
      })
      .catch(() => {
        setDidError(true);
      });
  }, [router]);

  if (didError) {
    return <ErrorPage description="Failed to refresh session, please try to refresh the page." />;
  }

  return <LoadingWithGif isCentre={true} />;
};
