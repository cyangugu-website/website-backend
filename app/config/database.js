const mongoose = require('mongoose')
require('dotenv').config()

const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD

const connection = mongoose.connect(`mongodb://atlas-sql-6702cd6c2a20e14da1ba0d77-xvw39.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin`)

.then(() => console.log("Mong DB Connected"))
.catch((err) => console.error(err))

module.exports = connection; 