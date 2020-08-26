// import lib
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { unlockAccount } = require("../utils/wallet")
// auth middleware use to get token for header and verify user if match
const auth = async (req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const user = await User.findOne({ tokens: {$elemMatch:{token}}});
        if(!user){
            throw new Error({error:"Please authenticate"})
        }
        req.user = user
        req.userAccount = unlockAccount(user.keyStore, user.username)[0]
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate"})
    }
}

// export module
module.exports = auth
