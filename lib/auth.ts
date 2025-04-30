// Simple authentication utility
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Hardcoded credentials (in a real app, you'd use a more secure approach)
const VALID_USERNAME = 'sckinerhack';
const VALID_PASSWORD = 'sckinerhack4ever';
const AUTH_COOKIE_NAME = 'redirect_auth';

export function isValidCredentials(username: string, password: string): boolean {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}

export function setAuthCookie(): void {
  // Set a simple auth cookie - in a real app, you'd use a JWT or similar
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

export function clearAuthCookie(): void {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  return cookieStore.has(AUTH_COOKIE_NAME);
}
