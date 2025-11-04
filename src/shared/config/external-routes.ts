import { env } from "./env";

const GOOGLE_OAUTH_REDIRECT_PATH = "/oauth2/authorization/google";

export const GOOGLE_OAUTH_REDIRECT_URL = env.API_BASE_URL + GOOGLE_OAUTH_REDIRECT_PATH;
