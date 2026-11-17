import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexGate } from "@/components/providers/convex-gate";
import { AuthProvider } from "@/components/providers/auth-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { WishlistProvider } from "@/components/providers/wishlist-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Static placeholder shown while the live header streams in. */
function HeaderSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-9 bg-ink" />
      <div className="border-b border-transparent">
        <div className="container-x relative flex h-16 items-center justify-between md:h-[4.5rem]">
          <div className="h-3 w-40 bg-line/60" />
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="font-display text-[1.55rem] font-semibold leading-none tracking-tight text-ink opacity-40">
              Gumberi
            </span>
          </div>
          <div className="h-3 w-24 bg-line/60" />
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://gumberi.example.com"),
  title: {
    default: "Gumberi — Clothing cut from the golden hour",
    template: "%s — Gumberi",
  },
  description:
    "Gumberi is a small-batch fashion atelier: hand-finished silhouettes in linen, silk and terracotta-dyed cotton. Shop the Summer '26 collections.",
  keywords: ["Gumberi", "fashion", "atelier", "linen", "small batch", "India"],
  openGraph: {
    siteName: "Gumberi",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Gumberi editorial",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ConvexGate>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <div className="flex min-h-dvh flex-col">
                    <Suspense fallback={<HeaderSkeleton />}>
                      <Header />
                    </Suspense>
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <Suspense fallback={null}>
                      <CartDrawer />
                    </Suspense>
                  </div>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </ConvexGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
