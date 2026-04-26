import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// =====================
// Categories
// =====================
export const categories = sqliteTable("categories", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),

    parentId: integer("parent_id"), // for nesting (optional)

    createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});

// =====================
// Posts
// =====================
export const posts = sqliteTable("posts", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),

    contentMd: text("content_md").notNull(),
    contentHtml: text("content_html"),

    coverImage: text("cover_image"),

    status: text("status", {
        enum: ["draft", "published"],
    }).notNull().default("draft"),

    categoryId: integer("category_id")
        .references(() => categories.id, { onDelete: "set null" }),

    createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
    publishedAt: integer("published_at", { mode: "timestamp" }),

    viewCount: integer("view_count").default(0),
});

// =====================
// Tags
// =====================
export const tags = sqliteTable("tags", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
});

// =====================
// Post <-> Tags (M2M)
// =====================
export const postTags = sqliteTable("post_tags", {
    postId: integer("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),

    tagId: integer("tag_id")
        .notNull()
        .references(() => tags.id, { onDelete: "cascade" }),
}, (table) => ({
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
}));

// =====================
// Views (analytics)
// =====================
export const views = sqliteTable("views", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    postId: integer("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),

    viewedAt: integer("viewed_at", { mode: "timestamp" }).defaultNow(),

    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
});

// =====================
// Relations
// =====================

export const postsRelations = relations(posts, ({ one, many }) => ({
    category: one(categories, {
        fields: [posts.categoryId],
        references: [categories.id],
    }),
    tags: many(postTags),
    views: many(views),
}));

export const categoriesRelations = relations(categories, ({ many, one }) => ({
    posts: many(posts),
    parent: one(categories, {
        fields: [categories.parentId],
        references: [categories.id],
    }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    posts: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
    post: one(posts, {
        fields: [postTags.postId],
        references: [posts.id],
    }),
    tag: one(tags, {
        fields: [postTags.tagId],
        references: [tags.id],
    }),
}));

export const viewsRelations = relations(views, ({ one }) => ({
    post: one(posts, {
        fields: [views.postId],
        references: [posts.id],
    }),
}));
