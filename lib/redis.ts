import { Redis } from "@upstash/redis";

/** Returns null locally until Upstash credentials have been configured. */
export function getRedis() {
  const url = process.env.STORAGE_KV_REST_API_URL;
  const token = process.env.STORAGE_KV_REST_API_TOKEN;

  if (!url || !token) return null;
  return new Redis({ url, token });
}
