import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "portfolio:sticker:crocs";

function storageUnavailable() {
  return Response.json(
    { error: "Le compteur partagé n’est pas encore configuré." },
    { status: 503 },
  );
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return storageUnavailable();

  const count = (await redis.get<number>(COUNTER_KEY)) ?? 0;
  return Response.json({ count }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST() {
  const redis = getRedis();
  if (!redis) return storageUnavailable();

  // Redis INCR is atomic, so concurrent visitors never overwrite a click.
  const count = await redis.incr(COUNTER_KEY);
  return Response.json({ count }, { headers: { "Cache-Control": "no-store" } });
}
