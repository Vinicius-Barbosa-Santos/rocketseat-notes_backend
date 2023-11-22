const authConfig = require('../config/auth')
const { verify } = require('jsonwebtoken')
const AppError = require("../utils/AppError")

const ensureAuthenticated = (request, response, next) => {
    const authHeaders = request.headers.authorization

    if (!authHeaders) {
        throw new AppError('JWT não encontrado', 401)
    }

    const [, token] = authHeaders.split(' ')

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()
    } catch {
        throw new AppError('JWT não encontrado', 401)
    }
}

module.exports = ensureAuthenticated