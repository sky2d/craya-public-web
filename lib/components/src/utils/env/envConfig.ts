type Environment = "development" | "preprod" | "production";

interface EnvConfig {
  environment: Environment;
  apiDomain: string;
  websiteDomain: string;
  baseDomain: string;
  sessionTokenFrontendDomain?: string;
}

export function getEnvConfig(): EnvConfig {
  const environment = (process.env.NEXT_PUBLIC_ENVIRONMENT || "development") as Environment;

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:8080";
  const webDomain = process.env.NEXT_PUBLIC_WEB_DOMAIN || "http://localhost:3000";

  if (!apiDomain) throw new Error("Missing NEXT_PUBLIC_API_DOMAIN");
  if (!webDomain) throw new Error("Missing NEXT_PUBLIC_WEB_DOMAIN");

  if (environment === "production") {
    const prodDomain = process.env.NEXT_PUBLIC_PROD_BASE_DOMAIN;
    if (!prodDomain) throw new Error("Missing NEXT_PUBLIC_PROD_BASE_DOMAIN");
    return {
      environment,
      apiDomain,
      websiteDomain: webDomain,
      sessionTokenFrontendDomain: `.${prodDomain}`,
      baseDomain: prodDomain,
    };
  }

  if (environment === "preprod") {
    const preprodDomain = process.env.NEXT_PUBLIC_PREPROD_BASE_DOMAIN;
    if (!preprodDomain) throw new Error("Missing NEXT_PUBLIC_PREPROD_BASE_DOMAIN");
    return {
      baseDomain: preprodDomain,
      environment,
      apiDomain,
      websiteDomain: webDomain,
      sessionTokenFrontendDomain: `.${preprodDomain}`,
    };
  }

  // Development fallback
  return {
    baseDomain: "localhost",
    environment,
    apiDomain,
    websiteDomain: "http://localhost:3000",
  };
}
