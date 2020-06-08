const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	}

	const likeArray = blogs.map(blog => blog.likes)
	const total = likeArray.reduce((sum, item) => sum + item, 0)
	return total
}

const favoriteBlog = (blogs) => {
	const likeArray = blogs.map(blog => blog.likes)
	const indexOfMax = likeArray.indexOf(Math.max(...likeArray))
	return {
		title: blogs[indexOfMax].title,
		author: blogs[indexOfMax].author,
		likes: blogs[indexOfMax].likes
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}