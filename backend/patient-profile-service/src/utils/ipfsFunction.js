const IPFS = require("ipfs");
const bs58 = require("bs58");

const addDocuments = async (_jsonData) => {
  const node = await IPFS.create();
  const results = await node.add(_jsonData);
  let _cid = results.cid.toString();
  node.stop();
  return _cid;
};

const readDocuments = async (_cid) => {
  const node = await IPFS.create();
  console.log({_cid,from:"function"})
  const stream = node.cat(_cid);
  let data = "";
  for await (const chunk of stream) {
    data += chunk.toString();
  }
  node.stop();
  return data;
};

const getBytes32FromIpfsHash = (ipfsListing) => {
  return "0x" + bs58.decode(ipfsListing).slice(2).toString("hex");
};

const getIpfsHashFromBytes32 = (bytes32Hex) => {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2);
  const hashBytes = Buffer.from(hashHex, "hex");
  const hashStr = bs58.encode(hashBytes);
  return hashStr;
};

module.exports = {
  addDocuments,
  readDocuments,
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32,
};
