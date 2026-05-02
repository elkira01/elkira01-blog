import z from "zod";


export const getPostSchema = z.number();

export const createPostSchema = z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().optional(),
    contentMd: z.string(),
    status: z.enum(["draft", "published"]).default("draft"),
});

export const updatePostSchema = z.object({
    id: z.number(),
    values: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        contentMd: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
    }),
});