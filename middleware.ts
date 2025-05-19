import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public and protected routes
const publicRoutes = ['/auth'];
const protectedRoutes = ['/dashboard'];

// Middleware function
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Retrieve access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;

  // Redirect "/auth" to "/auth/login"
  if (pathname === '/auth') {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.search = search;
    return NextResponse.redirect(loginUrl);
  }

  // Check if the current path is a protected or public route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from public routes to dashboard
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Define public and protected routes
// const publicRoutes = ['/auth'];
// const protectedRoutes = ['/dashboard'];

// // Middleware function
// export async function middleware(request: NextRequest) {
//   const { pathname, search } = request.nextUrl;

//   // Retrieve access token from Authorization header
//   const authHeader = request.headers.get('authorization');
//   const accessToken = authHeader?.startsWith('Bearer ')
//     ? authHeader.replace('Bearer ', '')
//     : null;

//   // Redirect "/auth" to "/auth/login"
//   if (pathname === '/auth') {
//     const loginUrl = new URL('/auth/login', request.url);
//     loginUrl.search = search;
//     return NextResponse.redirect(loginUrl);
//   }

//   // Check if the current path is a protected or public route
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // Redirect unauthenticated users from protected routes to login
//   if (isProtectedRoute && !accessToken) {
//     const loginUrl = new URL('/auth/login', request.url);
//     loginUrl.searchParams.set('from', `${pathname}${search}`);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Redirect authenticated users from public routes to dashboard
//   if (isPublicRoute && accessToken) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   // Allow the request to proceed
//   return NextResponse.next();
// }

// // Configure middleware to run on specific paths
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
