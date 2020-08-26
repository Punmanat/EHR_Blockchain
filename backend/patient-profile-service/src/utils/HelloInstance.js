const contract = require("@truffle/contract");
const abi = require('../../build/contracts/Hello.json');
const Web3 = require("web3")
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:22000");
const HelloInstance = contract(abi);
HelloInstance.setProvider(provider);

module.exports = {HelloInstance, web3: new Web3(provider)}