const{ UserNote } = require("../models/usernotes.model");

const saveUserNote = async(req, res) => {
    try {
        const { user } = req;
        const { note } = req.body;
        console.log(user.userId)
        const newCollection = new UserNote({
            owner: user.userId,
            notes: note,
        })
        const response = await newCollection.save()
        res.json({
            success: true,
            response
        })
    }
    catch(err) {
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

module.exports = {
    saveUserNote
}