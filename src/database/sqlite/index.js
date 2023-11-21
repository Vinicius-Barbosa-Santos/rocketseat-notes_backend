const path = require('path')
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite')

const sqliteConnection = () => {
    const database = sqlite.open({
        filename: path.resolve(__dirname, '..', 'database.db'),
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConnection