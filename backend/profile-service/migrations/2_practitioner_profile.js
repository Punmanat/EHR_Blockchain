const PractitionerProfile = artifacts.require("PractitionerProfile");

module.exports = function (deployer) {
  deployer.deploy(PractitionerProfile, {
    privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
  });
};
