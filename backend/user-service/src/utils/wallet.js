const Web3 = require("web3")
const bcrypt = require("bcrypt");
const web3 = new Web3()
const createAccount = (password)=>{
    const account = web3.eth.accounts.wallet.create(1)
    const keyStore = account.encrypt(password)
    return keyStore
}
const unlockAccount = (keyStore, password) => {
    return web3.eth.accounts.wallet.decrypt(keyStore, password)
}

module.exports = {
    createAccount,
    unlockAccount

}