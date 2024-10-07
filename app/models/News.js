const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    pictures: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const News = mongoose.model("News", newSchema);

module.exports = News;