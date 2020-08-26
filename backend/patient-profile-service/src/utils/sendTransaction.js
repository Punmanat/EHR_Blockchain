
const axios = require("axios");

module.exports = async (to, data) => {
  const rawTx = {
    data,
    to,
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdHJpY2siLCJ3YWxsZXRBZGRyZXNzIjoiMHhkNTJlZGQzOTQzZWY1MzA4M2NFMDZDNjNBNDYxZDM0RDViMGZmRTRBIiwiaWF0IjoxNTk4MjU3NTY1fQ.nqDdSkKjz98uI4CnLZplIlQ_Mc1sYGais9pk--_OdM4"
    }
  };

  const receipt = await axios.post(
    "http://localhost:3503/api/transaction/send", JSON.stringify(rawTx), headers
  );
  return receipt;
};
