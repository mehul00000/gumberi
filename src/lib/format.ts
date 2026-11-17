export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const FREE_SHIP_THRESHOLD = 4999;

export const shippingFor = (subtotal: number) =>
  subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : 99;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
