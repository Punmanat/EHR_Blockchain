const axios = require("axios");

module.exports = async (to, data, token, privateFrom, privateFor, url, tessera) => {
  const rawTx = {
    data,
    to,
    privateFrom,
    privateFor,
    url,
    tessera
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const receipt = await axios.post(
    "http://localhost:3503/api/transaction/sendPrivate",
    JSON.stringify(rawTx),
    headers
  );
  return receipt;
};