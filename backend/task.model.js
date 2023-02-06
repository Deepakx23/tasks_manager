const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    task_name: {
        type: String
    },
    task_description: {
        type: String
    },
    task_status: {
        type: String
    }
});

module.exports = mongoose.model('Task', Task);