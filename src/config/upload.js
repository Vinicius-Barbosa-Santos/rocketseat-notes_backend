const multer = require('multer')
const path = require('path')

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads')
const crypto = require('crypto')

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const hashFile = crypto.randomBytes(10).toString('hex')
            const filename = `${hashFile} - ${file.originalname}`

            return callback(null, filename)
        }

    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}