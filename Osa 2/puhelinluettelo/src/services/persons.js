import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

const create = newPerson => {
    const promise = axios.post(baseUrl, newPerson)
    return promise.then(response => response.data)
}

const update = (newPerson) => {
    const promise = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
    return promise.then(response => response.data)
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    .catch(error => console.log(error))
}

export default {
    getAll,
    create,
    update,
    remove
}
