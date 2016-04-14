module.exports = {
	use: [
		"postcss-import",
		"autoprefixer",
		"postcss-nested",
		"postcss-custom-media"
	],
	input: "src/app.css",
	output: "public/app.css",
	"autoprefixer": {
		browsers: ['last 2 versions']
	}
};
