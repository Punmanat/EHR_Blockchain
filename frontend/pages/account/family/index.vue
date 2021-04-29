<template>
  <div>
    <v-form>
      <v-card v-for="i in amounts" :key="i" class="my-3">
        <v-card-text>
          <v-select
            :items="menu"
            v-model="relation[i]"
            label="ความสัมพันธ์"
          ></v-select>
          <v-text-field v-model="names[i]" label="ชื่อ"></v-text-field>
          <v-text-field v-model="telecoms[i]" label="เบอร์โทร"></v-text-field>
          <v-text-field v-model="addresses[i]" label="ที่อยู่"></v-text-field>
          <v-select :items="sex" v-model="genders[i]" label="เพศ"></v-select>
        </v-card-text>
      </v-card>
      <br />
      <div class="text-center d-flex justify-space-around">
        <v-btn fab dark color="red" @click="removeRelation()">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn fab dark color="indigo" @click="addRelation()">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>
      <br />
      <div class="text-center">
        <v-btn rounded color="primary" block @click="confirm()">ยืนยัน</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      relationship: [],
      relation: [],
      names: [],
      telecoms: [],
      addresses: [],
      genders: [],
      amounts: [0],
      sex: ["ชาย", "หญิง", "อื่นๆ"],
      menu: ["พ่อ", "แม่", "ญาติ"],
    };
  },
  methods: {
    addRelation() {
      this.amounts.push(parseInt(this.amounts[this.amounts.length - 1]) + 1);
    },
    removeRelation() {
      this.amounts.pop();
    },
    async confirm() {
      let patientContact = {
        contacts: [],
      };
      this.amounts.forEach((i) => {
        let data = {
          relationship: this.relation[i],
          name: this.names[i],
          telecom: this.telecoms[i],
          address: this.addresses[i],
          gender: this.genders[i],
        };
        patientContact.contacts.push(data);
      });
       const status = await this.$store.dispatch(
          "user/updateProfileContact",
          patientContact
        );
        if (status) {
          return this.$router.push("/profile/patient");
        }
    },
  },
};
</script>

<style>
</style>