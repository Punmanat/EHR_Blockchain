const contract = require("@truffle/contract");
const abi = require("../../build/contracts/PatientProfile.json");
const Web3 = require("web3");

module.exports = async (url) => {
  const provider = url;
  const PatientProfileInstance = contract(abi);
  const web3 = new Web3(provider);
  PatientProfileInstance.setProvider(provider);
  const instance = await PatientProfileInstance.deployed();
  return { instance, web3 };
};
