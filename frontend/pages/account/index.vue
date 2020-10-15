<template>
  <div>
    <div>
      <!-- <h3 class="purple--text darken-1" >กรุณากรอกข้อมูลในช่องว่าง</h3> -->
      <v-text-field label="เลขบัตรประจำตัวประชาชน" :value="patient.personalId"></v-text-field>
      <v-text-field label="ชื่อ" :value="patient.fullname"></v-text-field>
      <v-text-field label="นามสกุล" :value="patient.lastname"></v-text-field>
      <v-text-field label="เบอร์โทร" :value="patient.telecom"></v-text-field>
      <v-select :items="sex" label="เพศ" v-model="gender"></v-select>
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
        <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
      </v-menu>
       <div class="text-center">
        <v-btn rounded color="primary" large style="width:80%;" @click="familyContact()">กรอกประวัติครอบครัว</v-btn>
      </div>
      <div class="text-center mt-3" >
        <v-btn rounded color="primary" large style="width:80%;" @click="register()">อัพเดทข้อมูล</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patient: {
        personalId: "1100748212755",
        fullname: "Punmanat",
        lastname: "Nunthasunti",
        telecom: "0681712221",
        gender: "ชาย",
        birthdate: "24/04/1999",
      },
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
    register() {
      this.$router.push("/profile/patient");
    },
    familyContact(){
      this.$router.push("/account/family");
    }
  },
  computed: {
    computedDateFormatted() {
      if (this.patient) {
        return this.patient.birthdate;
      }
      return this.formatDate(this.date);
    },
    gender(){
        if(this.patient){
            return this.patient.gender
        }
        return ""
    }
  },
};
</script>

<style>
</style>