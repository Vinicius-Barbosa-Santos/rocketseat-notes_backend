require('express-async-errors')

const express = require('express')

const app = express()
const AppError = require('./utils/AppError')
const routes = require('./routes')

const migrationsRun = require('./database/sqlite/migrations')

app.use(express.json())
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

const PORT = 8080

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))