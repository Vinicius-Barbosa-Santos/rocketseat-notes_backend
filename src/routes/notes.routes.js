const { Router } = require('express');

const notesRoutes = Router()

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController()

notesRoutes.post('/', notesController.create)

module.exports = notesRoutes