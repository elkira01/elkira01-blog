import type { posts } from "@/shared/db/schema";

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
