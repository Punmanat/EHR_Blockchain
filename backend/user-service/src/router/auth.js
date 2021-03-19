// import library
const User = require("../models/user")
const Express = require("express")
const router = Express.Router()
const auth = require("../middleware/auth")
const { unlockAccount } = require("../utils/wallet")


// create /login post request to check if user login
// return token to client
router.post("/login", async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken();
        // req.user = user
        res.status(201).send({username:user.username,role:user.role, token})
    } catch (error) {
        console.log({error})
        res.status(400).send({error:"Incorrect username or password"})
    }
})

// use to verify user if user login
router.get("/verify" ,auth,async (req, res)=>{
    try {
        res.send({username:req.user.username,role:req.user.role,walletAddress:unlockAccount(req.user.keyStore, req.user.username)[0].address})
    } catch (error) {
    }
})

// Use to logout user
router.get("/logout", auth,async (req, res)=>{
    try {
        const user = req.user
        user.tokens = []
        await user.save()
        res.send({status:true, desciption:"logout success"})
    } catch (error) {
        
    }
})

// Export router module
module.exports = router
