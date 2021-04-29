const Express = require("express");
const router = Express.Router();
const createInstance = require("../utils/instance");
const auth = require("../middleware/auth");
const sendTransaction = require("../utils/sendTransaction");
const {
  addDocuments,
  readDocuments,
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32,
} = require("../utils/ipfsFunction");
const url = "http://localhost:22001";
const tessera = "http://localhost:9082";

router.post("/", auth, async (req, res) => {
  try {
    const { observationInstance } = await createInstance(url);
    const instance = observationInstance;
    const observation = JSON.stringify({ ...req.body });
    const cid = await addDocuments(observation);
    const byte32_cid = getBytes32FromIpfsHash(cid);
    const data = instance.contract.methods
      .setObservation(
        req.body.subject,
        req.body.id,
        req.body.encounterId,
        byte32_cid
      )
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      [
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
      ],
      url,
      tessera
    );
    if (!receipt) {
      return res.status(400);
    }
    res.status(201).send(receipt.data);
  } catch (error) {
    console.log({ error });
  }
});

router.get("/:observationId", auth, async (req, res) => {
  try {
    const { observationInstance } = await createInstance(url);
    const instance = observationInstance;
    const options = {
      from: req.user.walletAddress,
      privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      gas: "900000",
      gasPrice: "0",
    };

    const observation_byte32 = await instance.getObservationByObservationId(
      req.params.observationId,
      options
    );
    const observation_ipfs = getIpfsHashFromBytes32(observation_byte32);
    // check not found
    if (observation_ipfs == "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51") {
      return res.status(404).send();
    }
    let observation = await readDocuments(observation_ipfs);
    observation = JSON.parse(observation);
    res.status(200).send(observation);
  } catch (error) {

    res.status(503).send();
  }
});

router.get("/all/:encounterId", auth, async (req, res) => {
  try {
    const { observationInstance } = await createInstance(url);
    const instance = observationInstance;
    const options = {
      from: req.user.walletAddress,
      privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      gas: "900000",
      gasPrice: "0",
    };

    const observation_byte32 = await instance.getObservationByEncounterId(
      req.params.encounterId,
      options
    );
    let ipfsHash = [];
    let data = [];
    ipfsHash = observation_byte32.map((b) => {
      return getIpfsHashFromBytes32(b);
    });
    for (const h of ipfsHash) {
      let _data = await readDocuments(h);
      _data = JSON.parse(_data);
      data.push(_data);
    }
    if (data.length == 0) {
      return res.status(404).send();
  }
    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
  }
});
module.exports = router;
