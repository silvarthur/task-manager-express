var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

var task = module.exports = mongoose.model('Task', taskSchema);