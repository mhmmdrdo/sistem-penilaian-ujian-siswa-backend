import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JwtPayload } from "./auth";

export function getAuthUser(req: NextRequest): JwtPayload | null {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function requireAuth(
  req: NextRequest,
  allowedRoles?: Array<"ADMIN" | "GURU">
): { user: JwtPayload } | NextResponse {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  return { user };
}
