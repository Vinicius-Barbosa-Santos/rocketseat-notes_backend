require('dotenv/config')
require('express-async-errors')

const cors = require('cors')
const express = require('express')

const app = express()
const routes = require('./routes')
const AppError = require('./utils/AppError')
const uploadConfig = require('./config/upload')

const migrationsRun = require('./database/sqlite/migrations')

app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)
migrationsRun()

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'internal server error'
    })
})

const PORT = process.env.SERVER_PORT || 8080
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))