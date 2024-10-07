const mongoose = require('mongoose')

const titleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs', 'Rev', 'Ven', 'Rt. Rev', 'Canon']
    }
})

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;