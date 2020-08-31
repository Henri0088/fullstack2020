import axios from 'axios'

const removeBlog = async ({ id, user }) => {
    const config = {
        headers: { Authorization: `bearer ${user.token}` }
    }

    const response = await axios.delete(`/api/blogs/${id}`, config)
    return response.data
}

export default removeBlog