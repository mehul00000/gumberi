"use client";

import { SignUp } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CLERK_ENABLED } from "@/components/providers/auth-provider";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-5 py-16">
      {CLERK_ENABLED ? (
        <Suspense>
          <SignUp fallbackRedirectUrl="/" signInUrl="/sign-in" />
        </Suspense>
      ) : (
        <div className="w-full max-w-md border border-line bg-card p-10 text-center">
          <BrandMark className="mx-auto h-14 w-14" />
          <h1 className="mt-6 font-display text-3xl tracking-tight text-ink">
            Create your Gumberi account
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Accounts arrive with Clerk — add your keys to{" "}
            <code className="bg-bg px-1.5 py-0.5">.env.local</code> and this
            page becomes a real sign-up flow.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Demo mode is fully browsable meanwhile
          </div>
          <ButtonLink href="/" className="mt-8 w-full" size="lg">
            Back to the atelier
          </ButtonLink>
          <p className="mt-6 text-xs text-ink-soft">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-accent underline-offset-2 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
