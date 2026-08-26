import { Redis } from "@upstash/redis";

/** Returns null locally until Upstash credentials have been configured. */
export function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;
  return new Redis({ url, token });
}
