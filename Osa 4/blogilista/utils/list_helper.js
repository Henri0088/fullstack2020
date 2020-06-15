const _ = require('lodash')

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

const mostBlogs = (blogs) => {
	const grouped = _.groupBy(blogs, (blog) => {
		return blog.author
	})

	authors = Object.keys(grouped)

	let mostBlogs
	let blogCount = 0

	_.forEach(authors, (person) => {
		if (grouped[`${person}`].length > blogCount) {
			blogCount = grouped[`${person}`].length
			mostBlogs = person
		}
	})

	return {
		author: mostBlogs,
		blogs: blogCount
	}
}

const mostLikes = (blogs) => {
	const grouped = _.groupBy(blogs, (blog) => {
		return blog.author
	})

	authors = Object.keys(grouped)

	let mostLikes
	let likeCount = 0
	
	authors.forEach((author) => {
		let l = 0
		grouped[`${author}`].forEach((blg) => {
			l += blg.likes
		}) 
		
		if (l > likeCount) {
			mostLikes = author
			likeCount = l
		}
	}) 
		
	return {
		author: mostLikes,
		likes: likeCount
	}

}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}