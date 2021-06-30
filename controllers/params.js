const { User } = require("../models/user.model");

const getUserById = async(req, res, next, userId ) => {
    try {
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({
            success: false,
            message: "User not found!"
        })
        req.user = user;
        next();
    } catch(err) {
        res.status(503).json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}