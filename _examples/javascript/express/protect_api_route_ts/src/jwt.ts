import { JwtPayload, sign, verify } from "jsonwebtoken";

const JWT_SECRET = "superSecret"; // Secret should be at least 32 characters

export function createToken(id: number): string {
  return sign({ userId: id }, JWT_SECRET, { expiresIn: "1w" });
}

export function verifyToken(token: string): string | JwtPayload {
    return verify(token, JWT_SECRET);
}
