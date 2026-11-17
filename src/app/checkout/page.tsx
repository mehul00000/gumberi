"use client";

import { Banknote, CreditCard, Lock, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthUser } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";
import { useConvexClient } from "@/lib/backend";
import { placeOrder } from "@/lib/orders";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SmartImage } from "@/components/ui/smart-image";
import { FREE_SHIP_THRESHOLD, formatINR, shippingFor } from "@/lib/format";
import { cn } from "@/lib/utils";

const PAYMENTS = [
  { id: "upi", label: "UPI", icon: Smartphone, note: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Card", icon: CreditCard, note: "Visa, Mastercard, Rupay" },
  { id: "cod", label: "Cash on delivery", icon: Banknote, note: "Up to ₹10,000" },
];

export default function CheckoutPage() {
  const cart = useCart();
  const { user, mode } = useAuthUser();
  const convex = useConvexClient();
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name === "Demo Guest" ? "" : user?.name ?? "",
    email: user?.email === "guest@gumberi.in" ? "" : user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const shipping = shippingFor(cart.subtotal);
  const total = cart.subtotal + shipping;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((f) => ({
      ...f,
      name: f.name || (user?.name === "Demo Guest" ? "" : user?.name ?? ""),
      email: f.email || (user?.email === "guest@gumberi.in" ? "" : user?.email ?? ""),
    }));
  }, [user]);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function place(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (cart.lines.length === 0) return;
    setPlacing(true);
    try {
      const order = await placeOrder(
        {
          ownerKey: mode === "clerk" && user ? `user:${user.id}` : `anon:${crypto.randomUUID()}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          items: cart.lines.map((l) => ({
            slug: l.slug,
            name: l.name,
            image: l.image,
            size: l.size,
            color: l.color,
            qty: l.qty,
            price: l.price,
          })),
          subtotal: cart.subtotal,
          shipping,
          total,
        },
        convex
      );
      cart.clear();
      router.push(`/checkout/success?order=${order.number}`);
    } catch {
      setError("Something snagged at the last stitch. Try again.");
      setPlacing(false);
    }
  }

  if (!cart.hydrated) {
    return <div className="container-x py-24" />;
  }

  if (cart.lines.length === 0) {
    return (
      <div className="container-x py-20">
        <EmptyState
          icon={Lock}
          title="Nothing to check out"
          copy="Your bag is empty — fill it with something that behaves in golden light."
          action={{ href: "/shop", label: "Go to the shop" }}
        />
      </div>
    );
  }

  const field =
    "h-12 w-full border border-line bg-card px-4 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none";

  return (
    <div className="container-x py-14 md:py-20">
      <h1 className="font-display text-4xl tracking-tight text-ink md:text-6xl">
        Checkout
      </h1>

      <form onSubmit={place} className="mt-12 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
        {/* Details */}
        <div className="space-y-12">
          <section>
            <h2 className="label-micro mb-5 text-accent">01 — Contact</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" value={form.name} onChange={set("name")} className={field} />
              <input required type="email" placeholder="Email" value={form.email} onChange={set("email")} className={field} />
              <input required type="tel" placeholder="Phone" value={form.phone} onChange={set("phone")} className={cn(field, "sm:col-span-2")} />
            </div>
            {mode === "demo" ? (
              <p className="mt-3 text-xs text-ink-soft">
                Demo mode — sign in with Clerk to prefill your details.
              </p>
            ) : null}
          </section>

          <section>
            <h2 className="label-micro mb-5 text-accent">02 — Shipping</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Street address" value={form.address} onChange={set("address")} className={cn(field, "sm:col-span-2")} />
              <input required placeholder="City" value={form.city} onChange={set("city")} className={field} />
              <input required placeholder="PIN code" pattern="[0-9]{6}" title="6-digit PIN" value={form.pincode} onChange={set("pincode")} className={field} />
            </div>
          </section>

          <section>
            <h2 className="label-micro mb-5 text-accent">03 — Payment</h2>
            <div className="space-y-3">
              {PAYMENTS.map(({ id, label, icon: Icon, note }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setPayment(id)}
                  className={cn(
                    "flex w-full items-center gap-4 border px-5 py-4 text-left transition-colors",
                    payment === id ? "border-accent bg-accent-soft/40" : "border-line hover:border-accent/50"
                  )}
                >
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink">{label}</span>
                    <span className="block text-xs text-ink-soft">{note}</span>
                  </span>
                  <span
                    className={cn(
                      "h-3.5 w-3.5 rounded-full border-2",
                      payment === id ? "border-accent bg-accent" : "border-line"
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-soft">
              <Lock className="h-3.5 w-3.5" />
              Demo checkout — no real payment is processed.
            </p>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-line bg-surface p-7">
            <h2 className="label-micro text-ink">
              In the bag ({cart.count})
            </h2>
            <ul className="mt-5 space-y-4">
              {cart.lines.map((line) => (
                <li key={line.key} className="flex gap-3">
                  <SmartImage src={line.image} alt={line.name} className="h-16 w-12 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{line.name}</p>
                    <p className="text-xs text-ink-soft">
                      {line.size} · ×{line.qty}
                    </p>
                  </div>
                  <p className="text-sm text-ink">{formatINR(line.price * line.qty)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="text-ink">{formatINR(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="text-ink">
                  {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base">
                <dt className="font-medium text-ink">Total</dt>
                <dd className="font-medium text-ink">{formatINR(total)}</dd>
              </div>
            </dl>
            {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
            <Button type="submit" size="lg" className="mt-6 w-full" disabled={placing}>
              {placing ? "Placing…" : `Place order — ${formatINR(total)}`}
            </Button>
            {cart.subtotal < FREE_SHIP_THRESHOLD ? (
              <p className="mt-3 text-center text-xs text-ink-soft">
                Free shipping kicks in at {formatINR(FREE_SHIP_THRESHOLD)}
              </p>
            ) : null}
            <ButtonLink href="/cart" variant="ghost" className="mt-2 w-full">
              Back to bag
            </ButtonLink>
          </div>
        </aside>
      </form>
    </div>
  );
}
