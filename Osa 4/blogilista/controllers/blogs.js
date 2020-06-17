const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
	
	logger.info(`INCOMING POST:`, req.body)

	if (!("title" in req.body)) {
		res.status(400).json({ error: 'title missing'})
		return
	}

	if (!('url' in req.body)) {
		res.status(400).json({ error: 'url missing'})
		return
	}

	const blog = new Blog(req.body)
	result = await blog.save()
	res.status(201).json(result)
})

module.exports = blogRouter