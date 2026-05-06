export async function GET() {
  return Response.json({
    DATABASE_URL: process.env.DATABASE_URL?.substring(0, 120),
    DIRECT_URL: process.env.DIRECT_URL?.substring(0, 120),
    JWT_SECRET: process.env.JWT_SECRET ? "ada" : "TIDAK ADA",
    NODE_ENV: process.env.NODE_ENV,
  })
}