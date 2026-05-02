import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/shared/db";
import { posts } from "@/shared/db/schema.ts";
import {createPostSchema, getPostSchema, updatePostSchema } from "../model/schemas";



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
