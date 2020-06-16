const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

const initialBlogs = [
	{
		title: "Cooking",
		author: "Cook",
		url: "genericCookMan.com",
		likes: 13
	},
	{
		title: "Surfing",
		author: "Surfer",
		url: "surferMan.com",
		likes: 12
	},
	{
		title: "Working with javafx",
		author: "mrJavaFX",
		url: "javafx.com",
		likes: 0
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
})

test('Correct number of JSON-blogs is returned', async () => {
	await api.get('/api/blogs')
	.expect(200).expect('Content-Type', /application\/json/)
})

test('Returned JSON-blogs have \"id\" field', async () => {
	blogs = await api.get('/api/blogs')
	blogs.body.forEach((blog) => {
		expect(blog.id).toBeDefined()
	})
})

test('Can post a blog succesfully', async () => {
	newBlog = {
		title: "How to post",
		author: "op",
		url: "this.com",
		likes: 3
	}
	await api.post('/api/blogs').send(newBlog)

	blogs = await api.get('/api/blogs')
	expect(blogs.body.length).toBe(initialBlogs.length + 1)
	
	const titles = blogs.body.map(blog => blog.title)
	expect(titles).toContain('How to post')
})

afterAll(() => {
	mongoose.connection.close()
})