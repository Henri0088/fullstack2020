const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id)
	res.json(blog)
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

blogRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	logger.info(`INCOMING DELETE REQ, id: ${id}`)

	result = await Blog.findByIdAndDelete(id)
	res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	logger.info(`INCOMING PUT REQ, id: ${id}`)
	newBlog = req.body

	result = await Blog.findByIdAndUpdate(id, newBlog)
	
	res.status(200).end()
})

module.exports = blogRouter