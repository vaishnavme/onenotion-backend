const mongoose = require("mongoose");
const { Schema } = mongoose;

const pageSchema = new Schema({
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
    isBookmark: { 
        type: Boolean 
    },
    content: { 
        type: String, 
        default: "Write your thoughts..." 
    },
    creator : {
        type: Schema.Types.ObjectId, ref: "User", required: true
    },
})

const Page = mongoose.model("Page", pageSchema);
module.exports = { Page };