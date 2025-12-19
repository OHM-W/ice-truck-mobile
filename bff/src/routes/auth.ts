import { Router } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { ENV } from "../config/env";

export const authRouter = Router();

/**
 * LOGIN
 * body: { username, password }
 * ใช้ PHP auth.php mode=login (ค่า default)
 */
authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Bad request" });
  }

  const { username, password } = parsed.data;

  try {
    const resp = await axios.post(
      `${ENV.XAMPP_BASE_URL}/auth.php`,
      { username, password },
      { timeout: 8000 }
    );

    if (!resp.data?.ok) {
      return res
        .status(401)
        .json({ message: resp.data?.message ?? "Invalid credentials" });
    }

    const user = resp.data.user;

    const token = jwt.sign(
      { sub: user.id, name: user.name, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN }
    );

    return res.json({ token, user });
  } catch (err) {
    console.error("Auth backend error:", err);
    return res.status(503).json({ message: "Auth service unavailable" });
  }
});

/**
 * REGISTER
 * body: { username, email, password, role }
 * ส่งต่อไป PHP auth.php mode=register
 */
authRouter.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Bad request" });
  }

  const payload = parsed.data;

  try {
    const resp = await axios.post(
      `${ENV.XAMPP_BASE_URL}/auth.php`,
      { ...payload, mode: "register" },
      { timeout: 8000 }
    );

    if (!resp.data?.ok) {
      const msg = resp.data?.message ?? "Register failed";
      const status = msg === "user already exists" ? 409 : 400;
      return res.status(status).json({ message: msg });
    }

    const user = resp.data.user;

    const token = jwt.sign(
      { sub: user.id, name: user.name, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN }
    );

    return res.json({ token, user });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Register failed" });
  }
});
