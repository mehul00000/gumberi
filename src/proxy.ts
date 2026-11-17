import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

/**
 * Clerk middleware is only wired up when real keys exist.
 * Without keys the site runs in demo mode: every route stays public
 * and a demo user is provided by the AuthProvider.
 */
const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  const isProtected = createRouteMatcher(["/account(.*)"]);
  if (isProtected(req)) {
    await auth.protect();
  }
});

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!hasClerk) return NextResponse.next();
  return clerkHandler(request, event);
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
};
