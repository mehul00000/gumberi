/** Shared doc shapes returned by Convex (supersets of client types). */
export type CartItemDoc = {
  _id: string;
  ownerKey: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

export type WishlistItemDoc = {
  _id: string;
  ownerKey: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
};

export type OrderDoc = {
  _id: string;
  ownerKey: string;
  number: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: {
    slug: string;
    name: string;
    image: string;
    size: string;
    color: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: number;
};
