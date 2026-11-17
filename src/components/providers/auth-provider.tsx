"use client";

import { ClerkProvider, useUser } from "@clerk/nextjs";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

/* ────────────────────────────────────────────────────────────
   AuthProvider — real Clerk auth when keys exist, demo user
   otherwise. Consumers read `useAuthUser()` and never need to
   know which mode is active.
   ──────────────────────────────────────────────────────────── */

export const CLERK_ENABLED = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);

export type AppUser = {
  id: string;
  name: string;
  email: string;
  initials: string;
};

type AuthState = {
  mode: "clerk" | "demo";
  user: AppUser | null;
  isLoaded: boolean;
};

const DEMO_USER: AppUser = {
  id: "demo-guest",
  name: "Demo Guest",
  email: "guest@gumberi.in",
  initials: "DG",
};

const AuthContext = createContext<AuthState>({
  mode: "demo",
  user: DEMO_USER,
  isLoaded: true,
});

export function useAuthUser() {
  return useContext(AuthContext);
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ClerkBridge({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const mapped: AppUser | null =
    isSignedIn && user
      ? {
          id: user.id,
          name: user.fullName ?? user.firstName ?? "Friend",
          email: user.primaryEmailAddress?.emailAddress ?? "",
          initials: initialsOf(user.fullName ?? user.firstName ?? "G"),
        }
      : null;
  return (
    <AuthContext.Provider value={{ mode: "clerk", user: mapped, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!CLERK_ENABLED) {
    return (
      <AuthContext.Provider value={{ mode: "demo", user: DEMO_USER, isLoaded: true }}>
        {children}
      </AuthContext.Provider>
    );
  }
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#b04a26",
          colorBackground: "#fffdf8",
          colorForeground: "#211b13",
          borderRadius: "0.25rem",
        },
      }}
    >
      <ClerkBridge>{children}</ClerkBridge>
    </ClerkProvider>
  );
}
