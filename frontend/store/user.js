const axios = require("axios");
const endpoint = [
  "http://localhost:8111/api/patient",
  "http://localhost:3503/api/auth",
  "http://localhost:8111/api/practitioner",
  "http://localhost:4000/api/health"
];
export const state = () => ({
  username: "",
  token: "",
  role: "",
  walletAddress: "",
  profile: {},
  patientProfile: {},
  encounter: {},
  encounters: [],
  observations: [],
  allergyIntolerances: []
});
export const mutations = {
  saveProfile(state, data) {
    state.profile = data;
  },
  savePatientProfile(state, data) {
    state.patientProfile = data;
  },
  logout(state) {
    state.username = "";
    state.token = "";
    state.role = "";
    state.walletAddress = "";
    state.profile = "";
    state.patientProfile = {};
    state.encounter = {};
    state.encounters = [];
    state.observations = [];
    state.allergyIntolerances = [];
  },
  saveUser(state, data) {
    state.username = data.username;
    state.role = data.role;
    state.token = data.token;
  },
  saveWalletAddress(state, data) {
    state.walletAddress = data.walletAddress;
  },
  saveEncounter(state, data) {
    state.encounter = data;
  },
  saveEncounters(state, data) {
    state.encounters = data;
  },
  saveObservation(state, data) {
    state.observations = data;
  },
  saveAllergyIntolerances(state, data) {
    state.allergyIntolerances = data;
  }
};
export const actions = {
  async login({ commit, getters }, user) {
    try {
      const _user = await axios.post(endpoint[1] + "/login", {
        username: user.username,
        password: user.password
      });
      if (_user.data) {
        commit("saveUser", _user.data);
      }
      const token = _user.data.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      const verify_user = await axios.get(endpoint[1] + "/verify", {
        headers
      });
      commit("saveWalletAddress", verify_user.data);
      let profile;
      if (getters.getRole == "Patient") {
        profile = await axios.get(endpoint[0], { headers });
      } else {
        profile = await axios.get(endpoint[2], { headers });
      }
      if (profile.data) {
        commit("saveProfile", profile.data.data);
        return true;
      }
      return false
    } catch (error) {
      return false;
    }
  },
  async updateProfile({ commit, getters }, profile) {
    let token = getters.getToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    const data = {
      resourceType: "Patient",
      personalId: profile.personalId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      address: profile.address,
      telecom: profile.telecom,
      gender: profile.gender,
      birthDate: profile.birthDate
    };
    const receipt = await axios.put(endpoint[0], data, { headers });
    if (receipt.data) {
      commit("saveProfile", data);
      return true;
    }
    return false;
  },
  async updateProfileContact({ commit, getters }, profileContact) {
    let token = getters.getToken;
    let _profile = getters.getProfile;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    const data = {
      ..._profile,
      ...profileContact
    };
    const receipt = await axios.put(endpoint[0], data, { headers });
    if (receipt.data) {
      commit("saveProfile", data);
      return true;
    }
    return false;
  },
  async setWhitelist({ getters }, practitionerId) {
    try {
      let token = getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      const receipt = await axios.post(
        endpoint[0] + "/whitelist/" + practitionerId,
        null,
        {
          headers
        }
      );
      if (receipt.data) {
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
    }
  },
  async checkWhitelist({ commit, getters }, personalId) {
    try {
      let practitionerProfile = getters.getProfile;
      let url =
        endpoint[2] +
        "/id/" +
        practitionerProfile.id +
        "/personalId/" +
        personalId;
      let token = getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      let profile = await axios.get(url, { headers });
      if (profile.data) {
        commit("savePatientProfile", profile.data.data);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  async setEncounter({ getters }, encounter) {
    const url = endpoint[3] + "/encounter";
    let token = getters.getToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    const data = {
      ...encounter
    };
    let receipt = await axios.post(url, data, { headers });
    if (receipt.data) {
      return true;
    }
    return false;
  },
  async setObservation({ getters }, observation) {
    try {
      const url = endpoint[3] + "/observation";
      let token = getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      const data = {
        ...observation
      };
      let receipt = await axios.post(url, data, { headers });
      if (receipt.data) {
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
    }
  },
  async getEncounter({ getters, commit }, personalId) {
    try {
      const url = endpoint[3] + "/encounter/all/" + personalId;
      let token = getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      let encounters = await axios.get(url, { headers });
      let data;
      if (encounters.data) {
        if (encounters.data.length > 1) {
          for (let i = 0; i < encounters.data.length; i++) {
            if (i + 1 < encounters.data.length) {
              if (
                new Date(encounters.data[i].issued) >
                new Date(encounters.data[i + 1].issued)
              ) {
                data = encounters.data[i];
              } else {
                data = encounters.data[i + 1];
              }
            }
          }
          commit("saveEncounter", data);
          return true;
        }
        commit("saveEncounter", encounters.data[0]);
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
      return false;
    }
  },
  async getEncounters({ getters, commit }, personalId) {
    try {
      const url = endpoint[3] + "/encounter/all/" + personalId;
      let token = getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      let encounters = await axios.get(url, { headers });
      if (encounters.data) {
        commit("saveEncounters", encounters.data.reverse());
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
      return false;
    }
  },
  async getObservation({ getters, commit }, encounterId) {
    const url = endpoint[3] + "/observation/all/" + encounterId;
    let token = getters.getToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    let observations = await axios.get(url, { headers });
    if (observations.data) {
      commit("saveObservation", observations.data);
      return true;
    }
    return false;
  },
  async setAllergyIntolerance({ getters }, allergyIntolerance) {
    try {
      const url = endpoint[3] + "/allergyIntolerance";
      let token = getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      const data = {
        ...allergyIntolerance
      };
      let receipt = await axios.post(url, data, { headers });
      if (receipt.data) {
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
    }
  },
  async getAllergyIntolerances({ getters, commit }, personalId) {
    try {
      const url = endpoint[3] + "/allergyIntolerance/all/" + personalId;
      let token = getters.getToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      let allergyIntolerances = await axios.get(url, { headers });
      if (allergyIntolerances.data) {
        commit("saveAllergyIntolerances", allergyIntolerances.data.reverse());
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }
};
export const getters = {
  getToken(state) {
    return state.token;
  },
  getProfile(state) {
    return state.profile;
  },
  getRole(state) {
    return state.role;
  },
  getEncounter(state) {
    return state.encounter;
  }
};
