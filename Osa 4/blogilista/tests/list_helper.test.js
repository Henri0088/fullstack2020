const listHelper = require('../utils/list_helper')

const blogList = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Test blog1',
		author: 'Test person1',
		url: 'example.com/yeet1',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Test blog2',
		author: 'Test person2',
		url: 'example.com/yeet2',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Test blog3',
		author: 'Test person3',
		url: 'example.com/yeet3',
		likes: 2,
		__v: 0
	}
]

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes: ', () => {
	const oneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Test blog1',
			author: 'Test person1',
			url: 'example.com/yeet1',
			likes: 5,
			__v: 0
		}
	]

	test('list with one blog returns its likes', () => {
		const result = listHelper.totalLikes(oneBlog)
		expect(result).toBe(5)
	})

	test('empty list returns 0', () => {
		expect(listHelper.totalLikes([])).toBe(0)
	})

	test('list of multiple blogs returns correct likes', () => {
		const result = listHelper.totalLikes(blogList)
		expect(result).toBe(14)
	})
})

describe('favorite blog: ', () => {
	test('returns correct blog correctly formatted from a hardcoded list', () => {
		const fav = listHelper.favoriteBlog(blogList)
		expect(fav).toEqual({
			title: 'Test blog2',
			author: 'Test person2',
			likes: 7
		})
	})
})

