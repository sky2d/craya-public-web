// lib/session.ts
import JsonWebToken, { JwtHeader, JwtPayload, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { cookies } from "next/headers";

const client = jwksClient({
  jwksUri: (process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:8080") + "/auth/jwt/jwks.json",
});
async function getAccessToken() {
  const cookiesStore = await cookies();
  const allCookies = cookiesStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
  console.log(`[SSR Auth] Received cookies: ${allCookies}`);
  // Supertokens standard cookie is sAccessToken. Also check st-access-token just in case.
  const token = cookiesStore.get("sAccessToken")?.value || cookiesStore.get("st-access-token")?.value;
  console.log(`[SSR Auth] Access token found: ${!!token}`);
  return token;
}

function getPublicKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid!, (err, key) => {
    if (err) return callback(err);
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

async function verifyToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    JsonWebToken.verify(token, getPublicKey, {}, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded as JwtPayload);
    });
  });
}

export async function getSSRSessionHelper() {
  const accessToken = await getAccessToken();
  const hasToken = !!accessToken;

  try {
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      return { accessTokenPayload: decoded, hasToken, error: undefined, accessToken };
    }
    return { accessTokenPayload: undefined, hasToken, error: undefined, accessToken: undefined };
  } catch (err) {
    console.error("[SSR Auth] verifyToken failed:", err);
    return { accessTokenPayload: undefined, hasToken, error: err as Error, accessToken };
  }
}
