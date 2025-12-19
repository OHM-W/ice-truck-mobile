import "dotenv/config";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "production",
  PORT: Number(process.env.PORT ?? 4000),

  XAMPP_BASE_URL: process.env.XAMPP_BASE_URL ?? "http://localhost/ice-api",

  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "12h",

  DEMO_LOGIN_ENABLED: process.env.DEMO_LOGIN_ENABLED === "true",

  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX ?? 120),
};
