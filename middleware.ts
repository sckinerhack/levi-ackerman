import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define protected routes
  const isProtectedRoute = path === '/redirects';
  
  // Define auth routes
  const isAuthRoute = path === '/login';
  
  // Check if user is authenticated
  const authCookie = request.cookies.get('redirect_auth');
  const isAuthenticated = !!authCookie;
  
  // Redirect unauthenticated users to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
  
  // Redirect authenticated users away from login page
  if (isAuthRoute && isAuthenticated) {
    const url = new URL('/redirects', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: ['/redirects', '/login'],
};
