const { Router } = require('express');
const multer = require('multer');

const userRoutes = Router()
const uploadConfig = require('../config/upload')

const UserController = require('../controllers/UserController');
const UserAvatarController = require('../controllers/UserAvatarController');

const userController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.MULTER)

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)
userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

module.exports = userRoutes