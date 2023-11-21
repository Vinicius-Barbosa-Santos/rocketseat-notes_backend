const knex = require('../database/knex')

class NotesController {
    async create(request, response) {
        const { user_id } = request.params
        const { title, description, tags, links } = request.body

        const [note_id] = await knex('notes').insert({
            title,
            description,
            user_id
        })

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        })


        await knex('links').insert(linksInsert)

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        })

        await knex('tags').insert(tagsInsert)

        return response.json()
    }

    async show(request, response) {
        const { id } = request.params

        const note = await knex('notes').where({ id }).first()
        const tags = await knex('tags').where({ note_id: id }).orderBy('name')
        const links = await knex('links').where({ note_id: id }).orderBy('created_at')

        return response.json({
            ...note,
            tags,
            links
        })
    }
}

module.exports = NotesController