//import rateLimit from "@/lib/rate-limit";

// const limiter = rateLimit({
//   interval: 60 * 1000, // 60 seconds
//   uniqueTokenPerInterval: 500, // Max 500 users per second
// });

// try {
//   await limiter.check(res, 10, "CACHE_TOKEN"); // 10 requests per minute
//   res.status(200).json({ data });
// } catch {
//   res.status(429).json({ error: "Rate limit exceeded" });
// }

export async function GET(request: Request) {
  return new Response('Hello, from API!');
}
