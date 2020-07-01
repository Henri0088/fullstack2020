const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const { TestScheduler } = require('jest')
const { response } = require('../app')

const api = supertest(app)

const initialUsers = [
    {
        username: 'Zoomer',
        name: 'Stanislav',
        password: 'WIB123'
    },
    {
        username: 'Kopler',
        name: 'Anton',
        password: 'DIGT123'
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

describe('POST to /api/users', () => {
    test('Username must be provided', async () => {
        newUser = {
            name: 'boomer',
            password: 'password'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('username missing')
    })
    test('Name must be provided', async () => {
        newUser = {
            username: 'Reltor',
            password: 'psb'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('name missing')
    })
    test('Username must be at least 3 chars long', async () => {
        newUser = {
            username: 're',
            name: 'BoyNextDoor',
            password: 'yeetyeet'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('username is too short')
    })
    test('Password must be at least 3 chars long', async () => {
        newUser = {
            username: 'Dextro',
            name: 'Johan',
            password: 'ye'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('password is too short')
    })
    test('Username must be unique', async () => {
        newUser = {
            username: 'Zoomer',
            name: 'Mikhail',
            password: 'salasanana'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('username already exists')
    })
})

afterAll(() => {
    mongoose.connection.close()
})