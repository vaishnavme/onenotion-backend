const mongoose = require("mongoose");

function dbConnection() {
    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected Successfully..."))
    .catch(error => console.log(`Error Occured: ${error}`))
}

module.exports = { dbConnection }