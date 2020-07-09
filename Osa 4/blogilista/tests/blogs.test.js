const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const getToken = async () => {
	await User.deleteMany({})

	const testUser = {
		username: "Tatti123",
		name: "Tatu",
		password: "1234"
	}

	const user = new User(testUser)
	const result = await user.save()

	const tokenUser = {
		username: "Tatti123",
		id: result._id
	}

	const token = jwt.sign(tokenUser, process.env.SECRET)
	const tokenBearer = 'bearer '.concat(token)
	return tokenBearer
}

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
	// Refresh test blogs
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
	test('Can post a blog succesfully with valid token', async () => {
		newBlog = {
			title: "How to post",
			author: "op",
			url: "this.com",
			likes: 3
		}
		const token = await getToken()

		await api.post('/api/blogs').send(newBlog).set({'Authorization': token})
	
		blogs = await api.get('/api/blogs')
		expect(blogs.body.length).toBe(initialBlogs.length + 1)
		
		const titles = blogs.body.map(blog => blog.title)
		expect(titles).toContain('How to post')
	})

	test('Cannot post if no token is provided', async () => {
		newBlog = {
			title: "How to post",
			author: "op",
			url: "this.com",
			likes: 3
		}
		await api.post('/api/blogs').send(newBlog).expect(401)
	})
	
	test('If no value for field \'likes\' then 0', async () => {
		newBlog = {
			title: "How to post",
			author: "op",
			url: "this.com"
		}
		const token = await getToken()

		await api.post('/api/blogs').send(newBlog).set({'Authorization': token})
	
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
	test('deleting with a valid id works if token is correct', async () => {
		const token = await getToken()

		newBlog = {
			title: "How to post",
			author: "op",
			url: "this.com",
			likes: 3
		}

		result = await api.post('/api/blogs').send(newBlog).set({'Authorization': token})
		blogId = result.body.id

		await api.delete(`/api/blogs/${blogId}`).set({'Authorization': token}).expect(204)
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

		expect(res.body.likes).toBe(14)
	})
})

afterAll(() => {
	mongoose.connection.close()
})