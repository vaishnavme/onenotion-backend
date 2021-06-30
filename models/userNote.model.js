const mongoose = require("mongoose");
const { Schema } = mongoose;

const userNote = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
        required: true,
    },
    publicPage: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
        required: true,
    }
})

const UserNote = mongoose.model("Note", userNote);

module.exports = { UserNote };