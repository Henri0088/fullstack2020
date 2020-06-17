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

describe('GET to /api/blogs', () => {
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
})

describe('POST to /api/blogs', () => {
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
	
	test('If no value for field \'likes\' then 0', async () => {
		newBlog = {
			title: "How to post",
			author: "op",
			url: "this.com"
		}
		await api.post('/api/blogs').send(newBlog)
	
		blogs = await api.get('/api/blogs')
		returnedNewBlog = blogs.body.find(blog => blog.title === 'How to post')
	
		expect(returnedNewBlog.likes).toBeDefined()
		expect(returnedNewBlog.likes).toBe(0)
	})
	
	test('if no values for fields \'title\' or \'url\' return 400', async () => {
		newBlog = {
			author: "op",
			likes: 5
		}
		await api.post('/api/blogs').send(newBlog).expect(400)
	})
})

describe('DELETE to /api/blogs/:id', () => {
	test('deleting with a valid id works', async () => {
		dbContent = await api.get('/api/blogs')
		idToDelete = dbContent.body[0].id

		await api.delete(`/api/blogs/${idToDelete}`)
		dbContentAfter = await api.get('/api/blogs')

		expect(dbContentAfter.body.length).toBe(dbContent.body.length - 1)
	})
})

describe('PUT to /api/blogs/:id', () => {
	test('updating amount of likes works', async () => {
		dbContent = await api.get('/api/blogs')
		idToModify = dbContent.body[0].id

		newLikes = {
			title: "Cooking",
			author: "Cook",
			url: "genericCookMan.com",
			likes: 14
		}

		await api.put(`/api/blogs/${idToModify}`).send(newLikes)
		
		res = await api.get(`/api/blogs/${idToModify}`)
		console.log(res.body)

		expect(res.body.likes).toBe(14)
	})
})

afterAll(() => {
	mongoose.connection.close()
})