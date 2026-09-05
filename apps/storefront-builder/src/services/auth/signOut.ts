import { getEnvConfig } from "components/src/utils/env/envConfig";
import Session from "supertokens-web-js/recipe/session";

export async function logout() {
  await Session.signOut();
}
