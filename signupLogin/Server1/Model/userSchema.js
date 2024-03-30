const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    created_on: {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel
