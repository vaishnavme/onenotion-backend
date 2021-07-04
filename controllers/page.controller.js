const { Page } = require("../models/page.model");
const { User } = require("../models/user.model");
const { extend } = require("lodash");

const populateOption = {
    path: "pages",
    select: "title date label isBookmark content"
}

const getPages = async(req, res) => {
    const { user } = req;

    try {
        const userAccount = await User.findById(user.userId).populate(populateOption)

        if(!userAccount) return res.status(404).json({
            success: false,
            message: "User not found"
        })
        pages = userAccount.pages
        if(pages.length === 0) return res.json({
            success: true,
            pages: [],
            message: "No page avaliable!"
        })
        res.json({
            success: true,
            pages,
            message: "Fetched pages successfully!"
        })

    } catch(err) {
        console.log(err)
        res.json({
            success: false,
            message: `Error Occured ${err}`
        })
    }
}

const getPage = async(req, res) => {
    const { user } = req;
    const { pageId } = req.params;
    try {
        const page = await Page.findById(pageId);
        if(!page) return res.status(404).json({
            success: false,
            message: "No page found"
        })
        const userId = user.userId.toString();
        const creatorId = page.creator.toString();
        // get page
        if(userId === creatorId) {
            res.json({
                success: true,
                page,
                message: "Page fetched successfully!"
            })
        } else {
            res.json({
                success: false,
                message: "User is not authenticated.",
                userId: userId,
                creatorId: creatorId
            })
        }
    } 
    catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Ocuured: ${err}`
        })
    }
}

const createPage = async(req, res) => {
    try {
        const { user } = req;
        const { page } = req.body;
     
        const userAccount = await User.findById(user.userId)
    
        const newPage = new Page({
            creator: user.userId,
            title: page.title, date: page.date, label: page.label,
            isBookmark: page.isBookmark, content: page.content
        })
        const savedPage = await newPage.save();

        // update user collection
        if(!userAccount) return res.status(404).json({
            success: false,
            message: "User not found"
        })
        userAccount.pages.push(savedPage._id)
        await userAccount.save()
        res.json({
            success: true,
            message: "Page created successfully!",
            savedPage
        })
    } catch(err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const updatePage = async(req, res) => {
    const { user } = req;
    const { pageId } = req.params;
    const { pageUpdates } = req.body;

    try {
        const page = await Page.findById(pageId);
        if(!page) return res.status(404).json({
            success: false,
            message: "No page found"
        })
        const userId = user.userId.toString();
        const creatorId = page.creator.toString();

        if(userId === creatorId) {
            const updated = extend(page, {
                page, ...pageUpdates
            })
            await updated.save();
            res.json({
                success: true,
                updated,
                message: "Page updated successfully"
            })
        } else {
            res.json({
                success: false,
                message: "User is not authenticated.",
                userId: userId,
                creatorId: creatorId
            })
        }
    }
    catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Ocuured: ${err}`
        })
    }
}

const deletePage = async(req, res) => {
    const { user } = req;
    const { pageId } = req.params;

    try {
        const page = await Page.findById(pageId);
        const userAccount = await User.findById(user.userId);
        if(!page) return res.status(404).json({
            success: false,
            message: "No page found"
        })
        const userId = user.userId.toString();
        const creatorId = page.creator.toString();

        if(userId === creatorId) {
            const deletedPage = await Page.findByIdAndDelete(pageId);
            if(!userAccount) return res.status(404).json({
                success: false,
                message: "User not found"
            })
            userAccount.pages.splice(userAccount.pages.indexOf(deletedPage._id), 1);
            await userAccount.save();
        }
        res.json({
            success: true,
            message: "Page successfully deleted!"
        })
    }
    catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Ocuured: ${err}`
        })
    }
}

module.exports = {
    getPages,
    getPage,
    createPage,
    updatePage,
    deletePage
}