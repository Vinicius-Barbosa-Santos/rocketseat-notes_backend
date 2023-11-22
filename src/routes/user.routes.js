const { Router } = require('express');

const userRoutes = Router()

const UserController = require('../controllers/UserController');
const userController = new UserController()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)

module.exports = userRoutes