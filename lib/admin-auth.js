import "server-only";

import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "kroinos_admin_session";
const SESSION_CONTEXT = "kroinos-admin-session-v1";

function getAccessKey() {
  return process.env.ADMIN_ACCESS_KEY?.trim() || "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || getAccessKey();
}

function digest(value) {
  return createHash("sha256").update(String(value)).digest();
}

function safeEqual(left, right) {
  return timingSafeEqual(digest(left), digest(right));
}

function expectedSessionToken() {
  const secret = getSessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(SESSION_CONTEXT).digest("hex");
}

export function isAdminConfigured() {
  return getAccessKey().length >= 12;
}

export function verifyAdminKey(candidate) {
  const expected = getAccessKey();
  if (expected.length < 12 || typeof candidate !== "string") return false;
  return safeEqual(candidate, expected);
}

export function hasAdminSession() {
  const received = cookies().get(ADMIN_COOKIE_NAME)?.value || "";
  const expected = expectedSessionToken();
  return Boolean(received && expected && safeEqual(received, expected));
}

export function createAdminSession() {
  const token = expectedSessionToken();
  if (!token) throw new Error("Admin access is not configured.");

  cookies().set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export function clearAdminSession() {
  cookies().set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
}
