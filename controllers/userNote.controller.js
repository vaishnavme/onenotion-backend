const{ UserNote } = require("../models/usernotes.model");
const { extend } = require("lodash");

const getUserNotes = async(req, res) => {
    try {
        const { user } = req;
        const userNotes = await UserNote.findOne({owner: user.userId});
        res.json({
            success: true,
            userNotes
        })
    }
    catch(err) {
        res.status(503).json({
            success: false,
            message: "No notes created by user"
        })
    }
}

const saveUserNote = async(req, res) => {
    try {
        const { user } = req;
        const { note } = req.body;

        const existingCollection = await UserNote.findOne({owner: user.userId});
        //add to existing notes collection
        if(existingCollection) {
            const addNewNote = extend(existingCollection, {
                notes: [...existingCollection.notes, note]
            })
            const newResponse = await addNewNote.save();
            return res.json({
                success: true,
                newResponse
            })
        }
        else {
            // create new collection for user
            const newCollection = new UserNote({
                owner: user.userId,
                notes: note,
            })
            const newResponse = await newCollection.save()
            res.json({
                success: true,
                newResponse
            })
        }   
    }
    catch(err) {
        res.status(503).json({ 
            success: false, 
            message: `Error Occured: ${err}`
        })
    }
}

const deleteNote = async(req, res) => {
    const { user } = req;
    const { noteId } = req.params;
    try {
        const userNotes = await UserNote.findOne({owner: user.userId});

        if(userNotes) {
            const updatedNotesArr = userNotes.notes.filter((noteItem) => noteItem._id != noteId);
            userNotes.notes = updatedNotesArr;

            const newResponse = await userNotes.save();
            res.json({
                success: true,
                newResponse
            })
        }
    } 
    catch(err) {
        res.status(503).json({
            success:false, 
            message: `cannot remove from cart ERROR ${err}`
        })
    }
}

module.exports = {
    getUserNotes,
    saveUserNote,
    deleteNote
}