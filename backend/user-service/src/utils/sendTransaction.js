const Web3 = require("web3")
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:22000");
const web3 = new Web3(provider)


const sendPublicTransaction = async (account, _tx) => {
    try {
    const tx = {
        from:account.address,
        gasPrice:"0",
        gas:"7900000",
       ..._tx 
    }
    const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey)
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    return receipt
    } catch (error) {
      console.log({error})
      return { error }
    }
  }
  
  module.exports = {sendPublicTransaction}