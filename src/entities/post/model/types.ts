import {posts} from "@/shared/db/schema.ts";

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
