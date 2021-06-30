const saveUserNote = async(req, res) => {
    try {
        const {user} = req;
        res.json({
            success: true
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