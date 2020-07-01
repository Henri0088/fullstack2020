const userRouter = require('express').Router()
require('express-async-errors')
const User = require('../models/user')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const bcrypt = require('bcryptjs')

userRouter.post('/', async (req, res) => {
    logger.info('INCOMING POST (users):', req.body)

    body = req.body

    if (!('username' in body)) {
        res.status(400).json({error: 'username missing'})
        return
    }

    if (!('name' in body)) {
        res.status(400).json({error: 'name missing'})
        return
    }

    if (body.username.length < 3) {
        res.status(400).json({error: 'username is too short'})
        return
    }

    if (body.password.length < 3) {
        res.status(400).json({error: 'password is too short'})
        return
    }

    result = await User.exists({ username: body.username })

    if (result) {
        res.status(400).json({error: 'username already exists'})
        return
    }

    const passHash = await bcrypt.hash(body.password, 10)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: passHash
    })

    const user = new User(newUser)
    result = await user.save()
    res.status(201).json(result)
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        title: 1, author: 1, url: 1, id: 1
    })
    res.json(users)
})

module.exports = userRouter