<template>
  <div>
    <div>
      <!-- <h3 class="purple--text darken-1" >กรุณากรอกข้อมูลในช่องว่าง</h3> -->
      <v-text-field
        label="เลขบัตรประจำตัวประชาชน"
        v-model="personalId"
      ></v-text-field>
      <v-text-field label="ชื่อ" v-model="firstName"></v-text-field>
      <v-text-field label="นามสกุล" v-model="lastName"></v-text-field>
      <v-text-field label="เบอร์โทร" v-model="telecom"></v-text-field>
      <v-select :items="sex" label="เพศ" v-model="gender"></v-select>
      <v-textarea
        solo
        name="input-7-4"
        label="ที่อยู่"
        v-model="address"
      ></v-textarea>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="computedDateFormatted"
            label="วันเกิด"
            persistent-hint
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <div class="text-center">
        <v-btn
          rounded
          color="primary"
          large
          style="width: 80%"
          @click="familyContact()"
          >กรอกประวัติครอบครัว</v-btn
        >
      </div>
      <div class="text-center mt-3">
        <v-btn
          rounded
          color="primary"
          large
          style="width: 80%"
          @click="update()"
          >อัพเดทข้อมูล</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.profile = this.$store.state.user.profile;
    this.personalId = this.profile.personalId;
    this.firstName = this.profile.firstName;
    this.lastName = this.profile.lastName;
    this.telecom = this.profile.telecom;
    this.birthDate = this.profile.birthDate;
    this.address = this.profile.address;
    this.gender = this.profile.gender;
  },
  data() {
    return {
      profile: {},
      personalId: "",
      firstName: "",
      lastName: "",
      telecom: "",
      birthDate: "",
      gender: "",
      address: "",
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      sex: ["ชาย", "หญิง", "อื่นๆ"],
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async update() {
      if (
        this.personalId != this.profile.personalId ||
        this.firstName != this.profile.firstName ||
        this.lastName != this.profile.lastName ||
        this.telecom != this.profile.telecom ||
        this.gender != this.profile.gender ||
        this.birthDate != this.profile.birthDate ||
        this.address != this.profile.address
      ) {
        let update_profile = {
          personalId: this.personalId,
          firstName: this.firstName,
          lastName: this.lastName,
          telecom: this.telecom,
          gender: this.gender,
          birthDate: this.birthDate,
          address: this.address,
        };
        const status = await this.$store.dispatch(
          "user/updateProfile",
          update_profile
        );
        if (status) {
          return this.$router.push("/profile/patient");
        }
      }
    },
    familyContact() {
      this.$router.push("/account/family");
    },
  },
  computed: {
    computedDateFormatted() {
      if (this.birthDate) {
        return this.birthDate;
      }
      return this.formatDate(this.date);
    },
  },
  watch: {
    date(val) {
      if (this.birthDate != val) {
        this.birthDate = this.formatDate(val);
      }
    },
  },
};
</script>

<style>
</style>