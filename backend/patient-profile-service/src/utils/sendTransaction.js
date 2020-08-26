
const axios = require("axios");

module.exports = async (to, data) => {
  const rawTx = {
    data,
    to,
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdHJpY2siLCJ3YWxsZXRBZGRyZXNzIjoiMHg1NDE1MGVmOTNFRTY2NjczOGZiMDAzYjk0QkNFQjc3MDBhN2VENzREIiwiaWF0IjoxNTk4NDM2NTg5fQ.1PFUlzAuposGnxCYGfXoXzYKRSsAeju26EQjCCQ1q2U"
    }
  };

  const receipt = await axios.post(
    "http://localhost:3503/api/transaction/send", JSON.stringify(rawTx), headers
  );
  return receipt;
};
