const mongoose = require('mongoose');
const validator = require('validator');

// define schema
const task_schema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps : true
});

// assign schema to model
const task_schema_model = mongoose.model('Task', task_schema);

// export it without creating json object
module.exports = task_schema_model;