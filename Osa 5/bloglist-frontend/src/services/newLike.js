import axios from 'axios'

const newLike = async ({blog}) => {
    const likedBlog = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }
    const id = blog.id
    const response = await axios.put(`/api/blogs/${id}`, likedBlog)
    return response.data
}

export default newLike