const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: { type: String, default: "Untitled"},
    date: { type: String },
    label: { type: String, default: "General"},
    isBookmarked: { type: Boolean },
    article: { type: String, default: "Write your thoughts..." }
})

const Note = mongoose.model("Note", noteSchema);

module.exports = { Note };