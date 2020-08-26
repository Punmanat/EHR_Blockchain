const Express = require("express")
const router = Express.Router()
const {HelloInstance} = require("../utils/HelloInstance")
const sendTransaction = require("../utils/sendTransaction")

router.get("/", async (req,res)=>{
    const instance = await HelloInstance.deployed();
    console.log({instance})
    const text = await instance.sayHello();
    res.send({text})
})

router.get("/setText", async (req,res)=>{
    try {
        const instance = await HelloInstance.deployed();
        const data = instance.contract.methods
          .setWord(
         "GGEZ GAMER"
          )
          .encodeABI();
        const receipt = await sendTransaction(instance.address, data);
        res.send(receipt.data)
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router