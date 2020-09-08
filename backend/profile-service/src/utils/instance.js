const contract = require("@truffle/contract");
const patient_abi = require("../../build/contracts/PatientProfile.json");
const practitioner_abi = require("../../build/contracts/PractitionerProfile.json");
const Web3 = require("web3");

module.exports = async (url) => {
  const provider = url;
  const _PatientProfileInstance = contract(patient_abi);
  const _PractitionerProfileInstance = contract(practitioner_abi);
  const web3 = new Web3(provider);
  _PatientProfileInstance.setProvider(provider);
  _PractitionerProfileInstance.setProvider(provider);
  const PatientProfileInstance = await _PatientProfileInstance.deployed();
  const PractitionerProfileInstance = await _PractitionerProfileInstance.deployed();
  return { PatientProfileInstance, PractitionerProfileInstance, web3 };
};
