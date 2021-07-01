const{ UserNote } = require("../models/usernotes.model");
const { extend } = require("lodash");
const { User } = require("../models/user.model");

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

const getNoteById = async(req, res) => {
    const { user } = req;
    const { noteId } = req.params;
    try {
        const userNotes = await UserNote.findOne({owner: user.userId});

        if(userNotes) {
            const noteRequested = userNotes.notes.find((noteItem) => noteItem._id == noteId);

            res.json({
                success: true,
                noteRequested
            })
        }
    } 
    catch(err) {
        res.status(503).json({
            success:false, 
            message: `ERROR ${err}`
        })
    }
}

const updateNoteById = async(req, res) => {
    const { user } = req;
    const { noteId } = req.params;
    const { note } = req.body;
    try {
        const userNotes = await UserNote.findOne({owner: user.userId});

        const updatedNotesArr = userNotes.notes.filter((noteItem) => noteItem._id != noteId);
        userNotes.notes = updatedNotesArr;
        
        await userNotes.save();
        const addNewNote = extend(userNotes, {
            notes: [...userNotes.notes, { _id: noteId,...note}]
        })
        const newResponse = await addNewNote.save();
        res.json({
            success: true,
            newResponse
        })
    } 
    catch(err) {
        res.status(503).json({
            success:false, 
            message: `cannot update note ERROR ${err}`
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
            message: `cannot delete note ERROR ${err}`
        })
    }
}

module.exports = {
    getUserNotes,
    saveUserNote,
    getNoteById,
    updateNoteById,
    deleteNote
}