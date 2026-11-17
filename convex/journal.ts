import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("journalPosts").collect();
  },
});

export const bySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("journalPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});
