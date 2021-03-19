const axios = require("axios");
const endpoint = [
  "http://localhost:8111/api/patient",
  "http://localhost:3503/api/auth"
];
export const state = () => ({
  username: "",
  role:"",
  profile: {}
});
export const mutations = {
  save(state, data) {
    state.username = data.username;
    state.role = data.role
    state.profile = data.profile;
  }
};
export const actions = {
  async login({ commit }, user) {
    try {
      const _user = await axios.post(endpoint[1] + "/login", {
        username: user.username,
        password: user.password
      });
      const token = _user.data.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      const profile = await axios.get(endpoint[0], { headers });
      if (profile.data) {
        let data = {
          username: _user.data.username,
          role:_user.data.role,
          profile: profile.data
        };
        commit("save", data);
        return true;
      }
    } catch (error) {
      return false;
    }
  }
};
