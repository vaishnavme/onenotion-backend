const { Page } = require("../models/page.model");
const { User } = require("../models/user.model");
const { PublicPage } = require("../models/publicpage.model");

const populateOption = {
    path: "publicPage",
    select: "title date label isBookmark content"
}

const getAllPublicPages = async(req, res) => {
    const { user } = req;

    try {
        const userShared = await PublicPage.find({sharedBy: user.userId}).populate(populateOption)
        

        if(!userShared) return res.status(404).json({
            success: false,
            message: "User not found"
        })
        const sharedPages = userShared.map((page) => page.publicPage)
    
        res.json({
            success: true,
            sharedPages,
            message: "Fetched all public pages successfully!"
        })

    } catch(err) {
        console.log(err)
        res.json({
            success: false,
            message: `Error Occured ${err}`
        })
    }
}

const getPublicPage = async(req, res) => {
    const { pageId } = req.params;

    try {
        const sharedPage = await PublicPage.findOne({publicPage: pageId}).populate(populateOption)
        res.json({
            success: true,
            sharedPage
        })
    }
    catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured ${err}`
        })
    }
}

const sharePublic = async(req, res) => {
    const { user } = req;
    const { pageId } = req.params;
    try {
        const pageToShare = await Page.findById(pageId);
        
        const userId = user.userId.toString();
        const creatorId = pageToShare.creator.toString();

        if(userId === creatorId) {
            const newPublic = new PublicPage({
                sharedBy: userId,
                publicPage: pageToShare._id,
            })
            const shared = await newPublic.save();
            res.json({
                success: true,
                shared,
                message: "Page Shared successfully"
            })
        } else {
            res.json({
                success: false,
                message: "User is not authenticated or no page avaiable",
            })
        }
    }
    catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured ${err}`
        })
    }
}

const deletePublicPage = async(req, res) => {
    const { user } = req;
    const { pageId } = req.params;
    try {
        const pageToShare = await Page.findById(pageId);
        
        const userId = user.userId.toString();
        const creatorId = pageToShare.creator.toString();

        if(userId === creatorId) {
            const deletedPage = await PublicPage.findOneAndDelete({publicPage: pageId})
            
            res.json({
                success: true,
                deletedPage,
                message: "Public page deleted successfully"
            })
        } else {
            res.json({
                success: false,
                message: "User is not authenticated or no page avaiable",
            })
        }
    }
    catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured ${err}`
        })
    }
}

module.exports = {
    getAllPublicPages,
    sharePublic,
    getPublicPage,
    deletePublicPage
}