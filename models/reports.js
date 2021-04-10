const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String
    },
    address: {
        type: String
    },
    issueType: {
        type: String
    }, 
    description: {
        type: String
    }
});

module.exports = mongoose.model('Reports', userSchema);