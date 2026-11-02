import { authClient } from "@/lib/auth-client";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Returns a short-lived JWT for the current session.
 * Throws when there is no signed-in user so callers can surface a clear error.
 */
export async function getAuthToken() {
  const { data, error } = await authClient.token();
  const token = data?.token;

  if (error || !token) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  return token;
}

/**
 * Fetch wrapper for protected backend routes. Attaches the JWT as a Bearer token.
 */
export async function authFetch(path: string, init: RequestInit = {}) {
  const token = await getAuthToken();
  const headers = new Headers(init.headers);

  headers.set("authorization", `Bearer ${token}`);

  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return fetch(`${API_URL}${path}`, { ...init, headers });
}
