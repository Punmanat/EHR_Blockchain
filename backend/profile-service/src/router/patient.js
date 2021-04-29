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
const url = "http://localhost:22000";
const tessera = "http://localhost:9081";
/* 
Route for crud profile of patients
*/
// Create profile
router.post("/", auth, async (req, res) => {
  try {
    const { PatientProfileInstance } = await createInstance(url);
    const instance = PatientProfileInstance;
    const profile = JSON.stringify({
      ...req.body,
      revision: 0,
    });
    const cid = await addDocuments(profile);
    const byte32_cid = getBytes32FromIpfsHash(cid);
    const data = instance.contract.methods
      .setProfile(req.body.personalId, req.user.walletAddress, byte32_cid, 0)
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
      [
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ],
      url,
      tessera
    );
    console.log({receipt : receipt.data})
    res.send(receipt.data);
  } catch (error) {
    console.log({error})
    res.status(401).send({ error: "Please authenticate" });
  }
});

// get profile
router.get("/", auth, async (req, res) => {
  try {
    const { PatientProfileInstance } = await createInstance(url);
    const instance = PatientProfileInstance;
    const options = {
      from: req.user.walletAddress,
      privateFor: [
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ],
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
    console.log({error})
    res.status(401).send({ error: "Please authenticate" });
  }
});

//update profile
router.put("/", auth, async (req, res) => {
  try {
    const { PatientProfileInstance } = await createInstance(url);
    const instance = PatientProfileInstance;
    const options = {
      from: req.user.walletAddress,
      privateFor: [
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ],
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
      .setProfile(
        req.body.personalId,
        req.user.walletAddress,
        byte32_cid,
        revision + 1
      )
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
      [
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ],
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
    const { PatientProfileInstance } = await createInstance(url);
    const instance = PatientProfileInstance;
    const data = instance.contract.methods
      .removeProfile(req.user.walletAddress)
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
      [
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ],
      url,
      tessera
    );
    res.send(receipt.data);
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
});

/*
Doctor get profile from patient that
patient allow to see their profile from 
patient set whitelist of doctorId and
call /get/:personalId to get 
patient profile
*/
//set whitelist from id
router.post("/whitelist/:id", auth, async (req, res) => {
  try {
    console.log("In")
    const { PatientProfileInstance } = await createInstance(url);
    const instance = PatientProfileInstance;
    const options = {
      from: req.user.walletAddress,
      privateFor: [
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ],
      gas: "900000",
      gasPrice: "0",
    };
    const valid = await instance.checkValid(req.user.walletAddress, options);
    if (!valid) {
      return res.status(404).send({ error: "profile not found!" });
    }
    const data = instance.contract.methods
      .setWhiteList(req.user.walletAddress, req.params.id)
      .encodeABI();
    const receipt = await sendTransaction(
      instance.address,
      data,
      req.token,
      "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
      [
        "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=",
        "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
      ],
      url,
      tessera
    );

    res.send(receipt.data);
  } catch (error) {
    console.log({error})
    res.status(401).send({ error: "Please authenticate" });
  }
});

module.exports = router;
