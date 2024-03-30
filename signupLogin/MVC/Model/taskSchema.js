const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: { type: String},
    description: { type: String, required: true },
    status: { type: String, required: true },
    created_on: {
        type: Date,
        default: Date.now()
    }
})

const taskModel = mongoose.model("Task", schema);

module.exports = taskModel
