import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    ownerKey: v.string(),
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
  },
  handler: async (ctx, args) => {
    const number = `GUM-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const id = await ctx.db.insert("orders", {
      ...args,
      number,
      status: "confirmed",
      createdAt: Date.now(),
    });
    // Empty the cart once the order is placed.
    const lines = await ctx.db
      .query("cartItems")
      .withIndex("by_owner", (q) => q.eq("ownerKey", args.ownerKey))
      .collect();
    for (const line of lines) await ctx.db.delete(line._id);
    return { id, number };
  },
});

export const listByOwner = query({
  args: { ownerKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_owner", (q) => q.eq("ownerKey", args.ownerKey))
      .order("desc")
      .collect();
  },
});

export const byNumber = query({
  args: { number: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_number", (q) => q.eq("number", args.number))
      .unique();
  },
});
