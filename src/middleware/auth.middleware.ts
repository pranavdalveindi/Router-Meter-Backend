import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
console.log(JWT_SECRET);

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["auth-session"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
    };

    (req as any).userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}