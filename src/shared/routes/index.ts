export const routePaths = {
	LOGIN: "/login",
	LOGOUT: "/logout",

	// PUBLIC

	HOME: "/",
	ABOUT: "/about",

	POST_READ: ($slug: string) => `/posts/${$slug}`,
	POSTS_CATEGORIES: "/posts/categories",
	CATEGORY_POSTS_LIST: ($slug: string) => `/posts/categories/${$slug}`,

	// PRIVATE

	ADMIN: "/admin",

	POST_EDIT: ($postId: string) => `/admin/posts/${$postId}/edit`,
	POST_CREATE: "/admin/posts/new",

	CATEGORY_MANAGEMENT: "/admin/categories",
};
