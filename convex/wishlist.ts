import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { ownerKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("wishlistItems")
      .withIndex("by_owner", (q) => q.eq("ownerKey", args.ownerKey))
      .collect();
  },
});

export const toggle = mutation({
  args: {
    ownerKey: v.string(),
    productId: v.string(),
    slug: v.string(),
    name: v.string(),
    price: v.number(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("wishlistItems")
      .withIndex("by_owner", (q) => q.eq("ownerKey", args.ownerKey))
      .collect();
    const match = existing.find((l) => l.productId === args.productId);
    if (match) {
      await ctx.db.delete(match._id);
      return false;
    }
    await ctx.db.insert("wishlistItems", args);
    return true;
  },
});

export const remove = mutation({
  args: { id: v.id("wishlistItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
