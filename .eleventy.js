module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/media")
    
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("src/posts/**/*.md")
            .sort((a, b) => b.date - a.date)
            .filter(post => !post.data.draft)
    })

    eleventyConfig.addNunjucksGlobal("getYear", function () {
		return new Date().getUTCFullYear()
	})

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        return dateObj.toISOString().split("T")[0]
    })

    eleventyConfig.addNunjucksGlobal("formatDate", function(date) {
        try {
            if (date) {
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            } else {
                return ''
            }
        } catch (e) {
            return ''
        }
    })
    
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    }
}