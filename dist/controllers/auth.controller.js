import { AuthService } from '../services/auth.service.js';
import { ConflictError } from '../utils/errors.js';
import { setAuthCookie } from '../utils/auth.js';
const authService = new AuthService();
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        // Correct: one object argument
        const user = await authService.register({ email, password });
        res.status(201).json({ message: "User created", user });
    }
    catch (err) {
        if (err instanceof ConflictError) {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: err.message || "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const { user, token } = await authService.login({ email, password });
        setAuthCookie(res, token);
        res.json({ user });
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
};
export const logoutController = async (req, res) => {
    try {
        // Clear JWT cookie
        res.clearCookie("auth-session", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        return res.status(200).json({
            message: "Logged out successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Logout failed",
        });
    }
};
