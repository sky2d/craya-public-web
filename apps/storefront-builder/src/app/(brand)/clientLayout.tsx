"use client";
import { LoadingBar } from "components/src/minor/LoadingBar";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<LayoutProps> = ({ children }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <LoadingBar className="w-full" />;
  }
  return <>{children}</>;
};
