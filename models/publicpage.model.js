const mongoose = require("mongoose");
const { Schema } = mongoose;

const publicSchema = new Schema({
    sharedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    publicPage: {
        type: Schema.Types.ObjectId,
        ref: "Page"
    }
})

const PublicPage = mongoose.model("PublicPage", publicSchema);
module.exports = { PublicPage };