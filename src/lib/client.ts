import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: import.meta.env.VITE_SERVICE_DOMAIN || "",
  apiKey: import.meta.env.VITE_API_KEY || "",
});