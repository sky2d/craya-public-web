import { getEnvConfig } from "./env/envConfig";

export function getEnvironmentInfo() {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const { baseDomain, environment } = getEnvConfig();

  const isLocalhost = hostname.includes("localhost") || hostname.includes(".local");

  const parts = hostname.split(".");
  let subdomain = "";

  // abc.craya.shop → parts.length = 3
  // abc.craya.local → parts.length = 3

  subdomain = parts[0].toLowerCase();

  return {
    environment,
    isLocal: isLocalhost,
    subdomain,
    protocol: isLocalhost ? "http" : "https",
    port: isLocalhost ? ":3000" : "",
    baseDomain: baseDomain,
    hostname,
  };
}

export function navigateToPath(path: string) {
  const { baseDomain } = getEnvironmentInfo();
  const { websiteDomain } = getEnvConfig();

  const destinationUrl = new URL(path, websiteDomain).toString();
  const currentUrl = window.location.href;

  const cookieDomain = `domain=.${baseDomain};`;

  document.cookie = `from=${encodeURIComponent(currentUrl)}; path=/; ${cookieDomain} SameSite=Lax`;

  // Redirect
  window.location.href = destinationUrl;
}

export function getFromParamOrCookie(): string | null {
  // 1. Try to get "from" from URL
  const urlParams = new URLSearchParams(window.location.search);
  const fromParam = urlParams.get("from");

  if (fromParam) {
    return decodeURIComponent(fromParam);
  }

  // 2. Fallback: try to get "from" from cookies
  const cookieMatch = document.cookie.match(/(?:^|;\s*)from=([^;]+)/);
  if (cookieMatch) {
    return decodeURIComponent(cookieMatch[1]);
  }

  return null;
}
