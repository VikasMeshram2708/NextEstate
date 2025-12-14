import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export const isSuperAdminRouteOnly = ["/approvers"];
export const isAdminRouteOnly = ["/dashboard"];
export const protectedRoutes = ["/profile", "/settings", "/register-ownership"];

export async function proxy(req: NextRequest) {
  const session = await auth();
  // console.log("s", session);

  const { pathname } = req.nextUrl;

  const isSuperAdminRoute = isSuperAdminRouteOnly.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = isAdminRouteOnly.some((route) =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // console.log({ isSuperAdminRoute, isAdminRoute, isProtectedRoute });

  // if there is no session and trying to access super admin protected route
  if (!session && isSuperAdminRoute) {
    // redirect to home page
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if there is no session and trying to access admin protected route
  if (!session && isAdminRoute) {
    // redirect to home page
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!session && isProtectedRoute) {
    // redirect to home page
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && isProtectedRoute) {
    // check the role
    if (
      session.user.role !== "MEMBER" &&
      session.user.role !== "SUPER_ADMIN" &&
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // if there is a session but role is not super admin and try to access super admin protected route

  if (session && isSuperAdminRoute) {
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // similarly for admin route
  if (session && isAdminRoute) {
    if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
