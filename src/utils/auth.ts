import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "2h") as StringValue;

export function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function setAuthCookie(res: Response, token: string): void {
  res.cookie("auth-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
}