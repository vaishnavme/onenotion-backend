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
    content: { 
        type: String
    },
    creator : {
        type: Schema.Types.ObjectId, ref: "User", required: true
    },
})

const Page = mongoose.model("Page", pageSchema);
module.exports = { Page };