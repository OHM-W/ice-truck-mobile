import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth";
import { trucksRouter } from "./routes/trucks";
import { errorHandler } from "./middlewares/errorHandler";
import { ENV } from "./config/env";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// rate limit สำหรับ endpoint /auth (login)
const loginLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max: ENV.RATE_LIMIT_MAX,
});

app.use("/auth", loginLimiter, authRouter);
app.use("/trucks", trucksRouter);

app.get("/healthz", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use(errorHandler as any);

app.listen(ENV.PORT, "0.0.0.0", () => {
  console.log(`BFF listening on http://0.0.0.0:${ENV.PORT} (${ENV.NODE_ENV})`);
});
