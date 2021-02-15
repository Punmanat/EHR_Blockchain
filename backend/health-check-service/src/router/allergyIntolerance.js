const express = require('express')
const router = express.Router()
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

router.post('/', auth, async (req,res)=>{
    try {
        const { allergyIntoleranceInstance } = await createInstance(url);
        const instance = allergyIntoleranceInstance;
        const allergyIntolerance = JSON.stringify({ ...req.body });
        const cid = await addDocuments(allergyIntolerance);
        const byte32_cid = getBytes32FromIpfsHash(cid);
        const data = instance.contract.methods
          .setAllerygyIntolerance(req.body.patient, req.body.id, byte32_cid)
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
        res.status(503).send();
      }
})
router.get('/:allergyIntoleranceId', auth, async (req,res)=>{
    try {
        const { allergyIntoleranceInstance } = await createInstance(url);
        const instance = allergyIntoleranceInstance;
        const options = {
          from: req.user.walletAddress,
          privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
          gas: "900000",
          gasPrice: "0",
        };
    
        const allergyIntolerance_byte32 = await instance.getAllergyIntoleranceByAllergyIntoleranceId(
          req.params.allergyIntoleranceId,
          options
        );
        const allergyIntolerance_ipfs = getIpfsHashFromBytes32(allergyIntolerance_byte32);
        // check not found
        if (allergyIntolerance_ipfs == "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51") {
          return res.status(404).send();
        }
        let allergyIntolerance = await readDocuments(allergyIntolerance_ipfs);
        allergyIntolerance = JSON.parse(allergyIntolerance);
        res.status(200).send(allergyIntolerance);
      } catch (error) {
        res.status(503).send();
      }
})
router.get('/all/:personalId', auth, async (req,res)=>{
    try {
        const { allergyIntoleranceInstance } = await createInstance(url);
        const instance = allergyIntoleranceInstance;
        const options = {
          from: req.user.walletAddress,
          privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="],
          gas: "900000",
          gasPrice: "0",
        };
    
        const allergyIntolerance_byte32 = await instance.getAllergyIntoleranceByPersonalId(
          req.params.personalId,
          options
        );
        let ipfsHash = [];
        let data = [];
        ipfsHash = allergyIntolerance_byte32.map((b) => {
          return getIpfsHashFromBytes32(b);
        });
        for (const h of ipfsHash) {
          let _data = await readDocuments(h);
          _data = JSON.parse(_data)
          data.push(_data);
        }
        if (data.length == 0) {
            return res.status(404).send();
        }
        res.status(200).send(data);
      } catch (error) {
        res.status(503).send();
      }
})
module.exports = router