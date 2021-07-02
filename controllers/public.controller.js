const { Page } = require("../models/page.model");

const togglePublicPages = async(req, res) => {
    const { user } = req;
    const { pageId } = req.params;
    const { type } = req.body;
    try {
        const page = await Page.findById(pageId);
        const userAccount = await User.findById(user.userId);

        if(!page || !userAccount) return res.status(404).json({
            success: false,
            message: "Page or User not found"
        })
        if(type === "ADD") {
            userAccount.publicPages.push(savedPage._id)
            await userAccount.save()
        } else {
            userAccount.publicPages.splice(userAccount.publicPages.indexOf(deletedPage._id), 1);
            await userAccount.save();
        }
        res.json({
            success: true,
            message: "Added to public page."
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
    togglePublicPages
}