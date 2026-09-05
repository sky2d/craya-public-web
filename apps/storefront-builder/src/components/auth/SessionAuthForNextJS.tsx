"use client";

import { useEffect, useState } from "react";
import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";

type Props = Parameters<typeof SessionAuth>[0] & {
  children?: React.ReactNode | undefined;
};

const AuthRedirector = ({ children }: { children: React.ReactNode }) => {
  const sessionContext = useSessionContext();

  useEffect(() => {
    if (!sessionContext.loading && !sessionContext.doesSessionExist) {
      window.location.href = "/auth";
    }
  }, [sessionContext]);

  if (sessionContext.loading || !sessionContext.doesSessionExist) {
    return null;
  }

  return <>{children}</>;
};

export const SessionAuthForNextJS = (props: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <>{props.children}</>;
  }

  return (
    <SessionAuth {...props} requireAuth={false}>
      <AuthRedirector>{props.children}</AuthRedirector>
    </SessionAuth>
  );
};
