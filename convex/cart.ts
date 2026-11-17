import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { ownerKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cartItems")
      .withIndex("by_owner", (q) => q.eq("ownerKey", args.ownerKey))
      .collect();
  },
});

export const add = mutation({
  args: {
    ownerKey: v.string(),
    productId: v.string(),
    slug: v.string(),
    name: v.string(),
    image: v.string(),
    price: v.number(),
    size: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cartItems")
      .withIndex("by_owner", (q) => q.eq("ownerKey", args.ownerKey))
      .collect();
    const match = existing.find(
      (l) =>
        l.productId === args.productId &&
        l.size === args.size &&
        l.color === args.color
    );
    if (match) {
      await ctx.db.patch(match._id, { qty: match.qty + 1 });
      return match._id;
    }
    return await ctx.db.insert("cartItems", { ...args, qty: 1 });
  },
});

export const setQty = mutation({
  args: { id: v.id("cartItems"), qty: v.number() },
  handler: async (ctx, args) => {
    if (args.qty <= 0) {
      await ctx.db.delete(args.id);
      return;
    }
    await ctx.db.patch(args.id, { qty: args.qty });
  },
});

export const remove = mutation({
  args: { id: v.id("cartItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clear = mutation({
  args: { ownerKey: v.string() },
  handler: async (ctx, args) => {
    const lines = await ctx.db
      .query("cartItems")
      .withIndex("by_owner", (q) => q.eq("ownerKey", args.ownerKey))
      .collect();
    for (const line of lines) await ctx.db.delete(line._id);
  },
});
