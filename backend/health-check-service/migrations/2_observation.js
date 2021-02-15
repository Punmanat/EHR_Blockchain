const ObservationContract = artifacts.require("ObservationContract");

module.exports = function (deployer) {
  deployer.deploy(ObservationContract, {
    privateFor: [
      "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
      "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
    ],
  });
};
