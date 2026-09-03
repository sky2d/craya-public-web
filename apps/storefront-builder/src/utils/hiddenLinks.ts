import { useEffect, useMemo, useState } from "react";

export function useHideNavbar(pathname: string) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const doNotShowNavbar = useMemo(() => {
    if (!mounted) return true;

    const hiddenPrefixes = ["/auth", "/dashboard", "/onboarding", "/influencer", "/builder", "/contact"];

    const host = window.location.hostname;
    const isBrandSubdomain = /^((preprod-)?brand)\./.test(host);

    return isBrandSubdomain || hiddenPrefixes.some(prefix => pathname.startsWith(prefix));
  }, [pathname, mounted]);

  return doNotShowNavbar;
}
