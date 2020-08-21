// import lib
const jwt = require("jsonwebtoken")
const User = require("../models/user")
// auth middleware use to get token for header and verify user if match
const auth = async (req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const user = await User.findOne({ tokens: {$elemMatch:{token}}});
        if(!user){
            throw new Error({error:"Please authenticate"})
        }
        req.user = user
        
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate"})
    }
}

// export module
module.exports = auth
