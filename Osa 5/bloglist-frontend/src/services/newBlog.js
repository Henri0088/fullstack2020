import axios from 'axios'
const baseUrl = '/api/blogs'

const newBlog = async ({user, title, author, url}) => {

    if (title === '' || url === '' || author === '') {
        throw new Error('Some fields are empty')
    }

    const info = {
        title: title,
        author: author,
        url: url,
    }

    const config = {
        headers: { Authorization: `bearer ${user.token}`}
    }

    const response = await axios.post(baseUrl, info, config)
    return response.data
}

export default newBlog