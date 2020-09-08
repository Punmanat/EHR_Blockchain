const PatientProfile = artifacts.require("PatientProfile");

module.exports = function (deployer) {
  deployer.deploy(PatientProfile, {
    privateFor: ["BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=","QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
  });
};
