"use client";

import { SignIn } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { CLERK_ENABLED } from "@/components/providers/auth-provider";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";

export default function SignInPage() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-5 py-16">
      {CLERK_ENABLED ? (
        <SignIn fallbackRedirectUrl="/" signUpUrl="/sign-up" />
      ) : (
        <div className="w-full max-w-md border border-line bg-card p-10 text-center">
          <BrandMark className="mx-auto h-14 w-14" />
          <h1 className="mt-6 font-display text-3xl tracking-tight text-ink">
            Sign in to Gumberi
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            The site is running in <strong className="text-ink">demo mode</strong>{" "}
            right now — authentication activates as soon as Clerk keys are added
            to <code className="bg-bg px-1.5 py-0.5">.env.local</code>.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Everything works locally in the meantime
          </div>
          <div className="mt-8 space-y-3">
            <ButtonLink href="/" className="w-full" size="lg">
              Continue as demo guest
            </ButtonLink>
            <ButtonLink href="/account" variant="outline" className="w-full">
              Open demo account
            </ButtonLink>
          </div>
          <p className="mt-6 text-xs text-ink-soft">
            No account yet?{" "}
            <Link href="/sign-up" className="text-accent underline-offset-2 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
