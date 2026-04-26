import { db } from "@/shared/db";
import { posts } from "@/shared/db/schema";
import { eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const getPostSchema = z.number();
const createPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  contentMd: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
});
const updatePostSchema = z.object({
  id: z.number(),
  values: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    contentMd: z.string().optional(),
    status: z.enum(["draft", "published"]).optional(),
  }),
});

export const getPost = createServerFn({ method: "GET" })
  .inputValidator(getPostSchema)
  .handler(async ({ data }) => {
    const [post] = await db.select().from(posts).where(eq(posts.id, data));
    return post ?? null;
  });

export const createPost = createServerFn({ method: "POST" })
  .inputValidator(createPostSchema)
  .handler(async ({ data }) => {
    const [post] = await db.insert(posts).values(data).returning();
    return post;
  });

export const updatePost = createServerFn({ method: "POST" })
  .inputValidator(updatePostSchema)
  .handler(async ({ data }) => {
    const [post] = await db
      .update(posts)
      .set({ ...data.values, updatedAt: new Date() })
      .where(eq(posts.id, data.id))
      .returning();
    return post;
  });
