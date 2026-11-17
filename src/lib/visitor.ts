/** Anonymous visitor id, used to key carts before sign-in. */
const KEY = "gumberi_vid";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    window.localStorage.setItem(KEY, id);
  }
  return id;
}
