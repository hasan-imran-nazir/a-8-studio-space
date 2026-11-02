import { authClient } from "@/lib/auth-client";

export { API_URL } from "@/lib/config";
import { API_URL } from "@/lib/config";

export async function getAuthToken() {
  const { data, error } = await authClient.token();
  const token = data?.token;

  if (error || !token) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  return token;
}

export async function authFetch(path: string, init: RequestInit = {}) {
  const token = await getAuthToken();
  const headers = new Headers(init.headers);

  headers.set("authorization", `Bearer ${token}`);

  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return fetch(`${API_URL}${path}`, { ...init, headers });
}
