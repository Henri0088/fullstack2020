const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app