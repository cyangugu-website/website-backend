const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true        
    },

    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String, 
    },
    profilePicture: {
        type: String,
        default: './image_1.png'
    },
})

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
