const axios = require("axios");
const endpoint = [
  "http://localhost:3503/api/user",
  "http://localhost:3503/api/auth",
  "http://localhost:8111/api/patient/"
];

export const actions = {
  async createUser({ commit }, registeredData) {
    const response = await axios.post(endpoint[0], {
      username: registeredData.username,
      password: registeredData.password,
      role: "Patient"
    });
    const user = await axios.post(endpoint[1] + "/login", {
      username: registeredData.username,
      password: registeredData.password
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.data.token
    };
    const data = {
      resourceType: "Patient",
      personalId: registeredData.personalId,
      firstName: registeredData.firstName,
      lastName: registeredData.lastName,
      address: registeredData.address,
      telecom: registeredData.tel,
      gender: registeredData.sex,
      birthDate: registeredData.birthDate
    };
    const response1 = await axios.post(endpoint[2], data, { headers });
    if (response.data && response1.data) {
      return true;
    }
    return false;
  }
};
