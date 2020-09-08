const Web3 = require("web3");
const quorumjs = require("quorum-js");

const sendPublicTransaction = async (account, _tx) => {
  try {
    const tx = {
      from: account.address,
      gasPrice: "0",
      gas: "7900000",
      ..._tx,
    };
    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      account.privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    return receipt;
  } catch (error) {
    console.log({ error });
    return { error };
  }
};

const sendPrivateTransaction = async (
  account,
  _tx,
  privateFrom,
  privateFor,
  url,
  tessera
) => {
  try {
    const provider = new Web3.providers.HttpProvider(url);
    const web3 = new Web3(provider);
    quorumjs.extend(web3);

    const rawTransactionManager = quorumjs.RawTransactionManager(web3, {
      privateUrl: tessera,
    });

    const txHash = await rawTransactionManager.storeRawRequest(
      _tx.data,
      privateFrom
    );
    const nonce = await web3.eth.getTransactionCount(account.address);
    const tx = {
      from: account.address,
      nonce: `0x${nonce.toString(16)}`,
      value: `0x${(0).toString(16)}`,
      gasPrice: "0",
      gas: "7900000",
      ..._tx,
    };
    tx.data = `0x${txHash}`;
    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      account.privateKey
    );

    const privateTx = rawTransactionManager.setPrivate(signedTx.rawTransaction);
    const privateTxHex = `0x${privateTx.toString("hex")}`;
    const receipt = await web3.eth.sendRawPrivateTransaction(privateTxHex, {
      privateFor,
    });
    return receipt;
  } catch (error) {
    console.log({ error });
    return { error };
  }
};

module.exports = { sendPublicTransaction, sendPrivateTransaction };
