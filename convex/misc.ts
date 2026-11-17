import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const newsletterSubscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) return { ok: true, already: true };
    await ctx.db.insert("newsletter", {
      email: args.email,
      createdAt: Date.now(),
    });
    return { ok: true, already: false };
  },
});

export const contactSubmit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contactMessages", {
      ...args,
      createdAt: Date.now(),
    });
    return { ok: true };
  },
});
