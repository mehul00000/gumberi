import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    slug: v.string(),
    name: v.string(),
    category: v.string(),
    price: v.number(),
    compareAt: v.optional(v.number()),
    description: v.string(),
    story: v.string(),
    images: v.array(v.string()),
    colors: v.array(v.object({ name: v.string(), hex: v.string() })),
    sizes: v.array(v.string()),
    details: v.array(v.string()),
    materials: v.string(),
    care: v.array(v.string()),
    badges: v.optional(v.array(v.string())),
    collection: v.string(),
    rating: v.number(),
    reviews: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  journalPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    category: v.string(),
    date: v.string(),
    readTime: v.number(),
    cover: v.string(),
    blocks: v.array(v.object({ type: v.string(), text: v.string() })),
  }).index("by_slug", ["slug"]),

  cartItems: defineTable({
    ownerKey: v.string(),
    productId: v.string(),
    slug: v.string(),
    name: v.string(),
    image: v.string(),
    price: v.number(),
    size: v.string(),
    color: v.string(),
    qty: v.number(),
  }).index("by_owner", ["ownerKey"]),

  wishlistItems: defineTable({
    ownerKey: v.string(),
    productId: v.string(),
    slug: v.string(),
    name: v.string(),
    price: v.number(),
    image: v.string(),
  }).index("by_owner", ["ownerKey"]),

  orders: defineTable({
    ownerKey: v.string(),
    number: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    pincode: v.string(),
    items: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        image: v.string(),
        size: v.string(),
        color: v.string(),
        qty: v.number(),
        price: v.number(),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    total: v.number(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_owner", ["ownerKey"])
    .index("by_number", ["number"]),

  scores: defineTable({
    name: v.string(),
    moves: v.number(),
    seconds: v.number(),
    createdAt: v.number(),
  }).index("by_moves", ["moves"]),

  newsletter: defineTable({
    email: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
});
