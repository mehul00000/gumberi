import { mutation } from "./_generated/server";
import { PRODUCTS, JOURNAL } from "./catalog";

/**
 * One-time seeding of the catalog into Convex.
 * Run after `npx convex dev` is connected:
 *   npx convex run seed:seedDatabase
 * The site also works without seeding — the client falls back
 * to the bundled catalog when the database is empty.
 */
export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length === 0) {
      for (const p of PRODUCTS) {
        await ctx.db.insert("products", p);
      }
    }
    const existingPosts = await ctx.db.query("journalPosts").collect();
    if (existingPosts.length === 0) {
      for (const post of JOURNAL) {
        await ctx.db.insert("journalPosts", post);
      }
    }
    return {
      products: existingProducts.length === 0 ? PRODUCTS.length : 0,
      posts: existingPosts.length === 0 ? JOURNAL.length : 0,
    };
  },
});
