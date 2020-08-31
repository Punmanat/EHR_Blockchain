const Express = require("express");
const router = Express.Router();
const createInstance = require("../utils/ProfileInstance");
const sendTransaction = require("../utils/sendTransaction");
const {
  addDocuments,
  readDocuments,
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32,
} = require("../utils/ipfsFunction");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { instance } = await createInstance("http://127.0.0.1:22000");
    const profile = JSON.stringify({
      ...req.body,
      revision: 0,
    });
    const cid = await addDocuments(profile);
    const byte32_cid = getBytes32FromIpfsHash(cid);
    const data = instance.contract.methods
      .setProfile(req.user.walletAddress, byte32_cid, 0)
      .encodeABI();
    const receipt = await sendTransaction(instance.address, data, req.token);
    res.send(receipt.data);
  } catch (error) {
    console.log({ error });
    res.status(401).send({ error: "Please authenticate" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { instance } = await createInstance("http://127.0.0.1:22000");
    const options = {
      from: req.user.walletAddress,
      privateFor: ["BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo="],
      gas: "900000",
      gasPrice: "0",
    };
    const profile_byte32 = await instance.getProfile(
      req.user.walletAddress,
      options
    );
    const profile_ipfs = getIpfsHashFromBytes32(profile_byte32);
    const data = await readDocuments(profile_ipfs);
    res.send({ data });
  } catch (error) {
    console.log({ error });
    res.status(401).send({ error: "Please authenticate" });
  }
});
module.exports = router;
