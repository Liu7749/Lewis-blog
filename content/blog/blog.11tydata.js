export default {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	permalink: data => `/blog/${data.page.fileSlug}/`,
};
