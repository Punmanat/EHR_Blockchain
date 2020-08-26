const Express = require("express")
const router = Express.Router()
const {sendPublicTransaction} = require("../utils/sendTransaction")
const auth = require("../middleware/auth")

// Need to authenticate 
router.post("/send", auth, async (req,res)=>{
    try {
        const receipt = await sendPublicTransaction(req.userAccount, req.body)
        res.send({receipt})      
    } catch (error) {
        res.status(401).send({error})
    }
})

module.exports = router
