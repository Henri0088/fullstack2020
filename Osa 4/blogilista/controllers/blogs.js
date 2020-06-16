const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)
	logger.info(`INCOMING POST: ${req.body}`)

	result = await blog.save()
	res.status(201).json(result)
})

module.exports = blogRouter