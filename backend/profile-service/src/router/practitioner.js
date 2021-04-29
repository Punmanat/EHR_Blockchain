const Express = require("express");
const router = Express.Router();
const createInstance = require("../utils/instance");
const sendTransaction = require("../utils/sendTransaction");
const {
  addDocuments,
  readDocuments,
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32,
} = require("../utils/ipfsFunction");
const auth = require("../middleware/auth");
const url = "http://localhost:22001";
const tessera = "http://localhost:9082";
/* 
Route for crud profile of practitioner
node2
*/
// Create profile
router.post("/", auth, async (req, res) => {
  try {
    const { PractitionerProfileInstance } = await createInstance(url);
    const instance = PractitionerProfileInstance;
    const profile = JSON.stringify({
      ...req.body,
      revision: 0,
    });
    const cid = await addDocuments(profile);
    const byte32_cid = getBytes32FromIpfsHash(cid);
    const data = instance.contract.methods
      .setProfile(req.body.id, req.user.walletAddress, byte32_cid, 0)
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      url,
      tessera
    );
    res.send(receipt.data);
  } catch (error) {
    console.log({error})
    res.status(401).send({ error: "Please authenticate" });
  }
});

// get profile
router.get("/", auth, async (req, res) => {
  try {
    const { PractitionerProfileInstance } = await createInstance(url);
    const instance = PractitionerProfileInstance;
    const options = {
      from: req.user.walletAddress,
      privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      gas: "900000",
      gasPrice: "0",
    };
    const valid = await instance.checkValid(req.user.walletAddress, options);
    if (!valid) {
      return res.status(404).send({ error: "profile not found!" });
    }
    const profile_byte32 = await instance.getProfile(
      req.user.walletAddress,
      options
    );
    const profile_ipfs = getIpfsHashFromBytes32(profile_byte32);
    let data = await readDocuments(profile_ipfs);
    data = JSON.parse(data);
    res.send({ data });
  } catch (error) {
    console.log({ error });
    res.status(401).send({ error: "Please authenticate" });
  }
});

//update profile
router.put("/", auth, async (req, res) => {
  try {
    const { PractitionerProfileInstance } = await createInstance(url);
    const instance = PractitionerProfileInstance;
    const options = {
      from: req.user.walletAddress,
      privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      gas: "900000",
      gasPrice: "0",
    };
    const valid = await instance.checkValid(req.user.walletAddress, options);
    if (!valid) {
      return res.status(404).send({ error: "profile not found!" });
    }
    const revision = parseInt(
      await instance.getRevision(req.user.walletAddress)
    );
    const profile = JSON.stringify({
      ...req.body,
      revision: revision + 1,
    });
    const cid = await addDocuments(profile);
    const byte32_cid = getBytes32FromIpfsHash(cid);
    const data = instance.contract.methods
      .setProfile(req.body.id, req.user.walletAddress, byte32_cid, revision + 1)
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      url,
      tessera
    );
    res.send(receipt.data);
  } catch (error) {
    console.log({ error });
    res.status(401).send({ error: "Please authenticate" });
  }
});

//delete profile
router.delete("/", auth, async (req, res) => {
  try {
    const { PractitionerProfileInstance } = await createInstance(url);
    const instance = PractitionerProfileInstance;
    const data = instance.contract.methods
      .removeProfile(req.user.walletAddress)
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      url,
      tessera
    );
    res.send(receipt.data);
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
});

// doctors get profile by personalId
// check valid
// get whitelist
// check whitelist
// return profile
router.get("/id/:id/personalId/:personalId", async (req, res) => {
  try {
    const { PatientProfileInstance } = await createInstance(url);
    const instance = PatientProfileInstance;
    const options = {
      // from: req.user.walletAddress,
      privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
      gas: "900000",
      gasPrice: "0",
    };
    const valid = await instance.checkValidByPersonalId(
      req.params.personalId,
      options
    );
    if (!valid) {
      return res.status(404).send({ error: "profile not found!" });
    }
    const checkWhitelist = await instance.checkWhiteList(
      req.params.personalId,
      req.params.id,
      options
    );
    if (!checkWhitelist) {
      return res.status(401).send({ error: "Unauthorized to view profile" });
    }
    const profile_byte32 = await instance.getProfileById(
      req.params.personalId,
      options
    );
    const profile_ipfs = getIpfsHashFromBytes32(profile_byte32);
    let data = await readDocuments(profile_ipfs);
    data = JSON.parse(data);
    res.send({ data });
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
});
module.exports = router;
