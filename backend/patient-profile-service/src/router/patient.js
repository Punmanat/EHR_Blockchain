const Express = require("express")
const router = Express.Router()
const {HelloInstance,web3} = require("../utils/HelloInstance")
const sendTransaction = require("../utils/sendTransaction")

router.get("/", async (req,res)=>{
    const instance = await HelloInstance.deployed();
    const text = await instance.sayHello({ privateFor: ["BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo="], gas: "900000", gasPrice: "0"});
    console.log(text)
    res.send({text})
})

router.get("/setText", async (req,res)=>{
    try {
        const instance = await HelloInstance.deployed();
        const data = instance.contract.methods
          .setWord(
         "Secret data!!"
          )
          .encodeABI();
        const receipt = await sendTransaction(instance.address, data);
        res.send(receipt.data)
    } catch (error) {
        res.status(401).send({error:"Please authenticate"})
    }
    
})

module.exports = router