import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** Top scores for the Match the Look game, fewest moves first. */
export const top = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("scores")
      .withIndex("by_moves")
      .order("asc")
      .take(60);
    return rows
      .sort((a, b) => a.moves - b.moves || a.seconds - b.seconds)
      .slice(0, 10);
  },
});

export const submit = mutation({
  args: {
    name: v.string(),
    moves: v.number(),
    seconds: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("scores", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
