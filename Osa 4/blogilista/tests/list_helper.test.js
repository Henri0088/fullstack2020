const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	const oneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Test blog',
			author: 'Test person',
			url: 'example.com/yeet',
			likes: 5,
			__v: 0
		}
	]

	test('list with one blog returns its likes', () => {
		const result = listHelper.totalLikes(oneBlog)
		expect(result).toBe(5)
	})

})