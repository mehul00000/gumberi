"use client";

import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import { CLERK_ENABLED, useAuthUser } from "@/components/providers/auth-provider";
import { ButtonLink } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, mode } = useAuthUser();

  return (
    <div className="container-x py-14 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label-micro text-accent">Account</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink md:text-6xl">
            Profile
          </h1>
        </div>
        <Link href="/account" className="label-micro text-ink-soft hover:text-accent">
          ← Account home
        </Link>
      </div>

      <div className="mt-12">
        {CLERK_ENABLED ? (
          <div className="clerk-profile">
            <UserProfile
              appearance={{
                variables: {
                  colorPrimary: "#b04a26",
                  colorBackground: "var(--card)",
                  colorForeground: "var(--ink)",
                  borderRadius: "0.125rem",
                },
              }}
            />
          </div>
        ) : (
          <div className="max-w-xl border border-line bg-surface p-8">
            <p className="label-micro text-accent">Demo session</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">Name</dt>
                <dd className="text-ink">{user?.name}</dd>
              </div>
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">Email</dt>
                <dd className="text-ink">{user?.email}</dd>
              </div>
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">Session</dt>
                <dd className="text-ink">{mode === "demo" ? "Demo (local only)" : mode}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-ink-soft">
              You are browsing Gumberi in demo mode. Add your Clerk keys to
              <code className="mx-1 bg-bg px-1.5 py-0.5">.env.local</code>
              to enable real accounts, sessions and profile management.
            </p>
            <ButtonLink href="/sign-in" className="mt-6">
              How sign-in works
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
