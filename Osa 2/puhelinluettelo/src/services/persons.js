import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

const create = newPerson => {
    const promise = axios.post(baseUrl, newPerson)
    return promise.then(response => response.data)
}

const update = (id, newPerson) => {
    const promise = axios.post(`${baseUrl}/${id}`, newPerson)
    return promise.then(response => response.data)
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    remove
}
