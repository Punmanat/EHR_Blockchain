const contract = require("@truffle/contract");
const encounter = require("../../build/contracts/EncounterContract.json");
const observation = require("../../build/contracts/ObservationContract.json");
const allergyIntolerance = require("../../build/contracts/allergyIntoleranceContract.json");
const Web3 = require("web3");

module.exports = async (url) => {
  const provider = url;
  const _encounterInstance = contract(encounter);
  const _observationInstance = contract(observation);
  const _allergyIntoleranceInstance = contract(allergyIntolerance);
  const web3 = new Web3(provider);
  _encounterInstance.setProvider(provider);
  _observationInstance.setProvider(provider);
  _allergyIntoleranceInstance.setProvider(provider);
  const encounterInstance = await _encounterInstance.deployed();
  const observationInstance = await _observationInstance.deployed();
  const allergyIntoleranceInstance = await _allergyIntoleranceInstance.deployed();
  return { encounterInstance, observationInstance, allergyIntoleranceInstance, web3 };
};
