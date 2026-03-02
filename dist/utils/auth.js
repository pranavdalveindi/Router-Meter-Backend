import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "2h");
export function generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
export function setAuthCookie(res, token) {
    res.cookie("auth-session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
}
