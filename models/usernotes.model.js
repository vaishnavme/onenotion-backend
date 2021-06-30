const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: { 
        type: String, 
        default: "Untitled"
    },
    date: { 
        type: String 
    },
    label: { 
        type: String, 
        default: "General"
    },
    isBookmarked: { 
        type: Boolean 
    },
    article: { 
        type: String, 
        default: "Write your thoughts..." 
    }
})


const userNotesSchema = new Schema({
    owner : {
        type: Schema.Types.ObjectId, ref: "User", required: true
    },
    notes: [noteSchema]
})

const UserNote = mongoose.model("UserNote", userNotesSchema);
module.exports = { UserNote };