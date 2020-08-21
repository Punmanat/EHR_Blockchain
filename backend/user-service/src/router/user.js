// import library
const User = require("../models/user")
const Express = require("express")
const router = Express.Router()
// create user
router.post("/", async (req, res)=>{
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({status:"User created success !!", username:user.username})
    } catch (error) {
        res.status(400).send(error)
    }

})

// export module
module.exports = router
