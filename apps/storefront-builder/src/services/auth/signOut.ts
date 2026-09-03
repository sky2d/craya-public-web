import Session from "supertokens-web-js/recipe/session";

export async function logout() {
  await Session.signOut();
  window.location.href = process.env.NEXT_PUBLIC_WEB_DOMAIN || "/";
}
