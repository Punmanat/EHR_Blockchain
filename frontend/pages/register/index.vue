<template>
  <v-form>
    <!-- <h3 class="purple--text darken-1" >กรุณากรอกข้อมูลในช่องว่าง</h3> -->
    <v-text-field label="ชื่อผู้ใช้งาน" v-model="username"></v-text-field>
    <v-text-field
      label="รหัสผ่าน"
      type="password"
      v-model="password"
    ></v-text-field>
    <v-text-field
      label="เลขบัตรประจำตัวประชาชน"
      v-model="personalId"
    ></v-text-field>
    <v-text-field label="ชื่อ" v-model="firstName"></v-text-field>
    <v-text-field label="นามสกุล" v-model="lastName"></v-text-field>
    <v-textarea
      solo
      name="input-7-4"
      label="ที่อยู่"
      v-model="address"
    ></v-textarea>
    <v-text-field label="เบอร์โทร" v-model="tel"></v-text-field>
    <v-select :items="sexs" v-model="sex" label="เพศ"></v-select>
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
    <v-checkbox label="ยอมรับเงื่อนไขและข้อตกลงการใช้บริการ"></v-checkbox>
    <div class="text-center">
      <v-btn
        rounded
        color="#dadf74"
        large
        style="width: 80%"
        @click="register()"
        >ลงทะเบียน</v-btn
      >
    </div>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      sexs: ["ชาย", "หญิง", "อื่นๆ"],
      username: "",
      password: "",
      personalId: "",
      firstName: "",
      lastName: "",
      address: "",
      tel: "",
      sex: "",
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async register() {
      const registeredData = {
        username: this.username,
        password: this.password,
        personalId: this.personalId,
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        tel: this.tel,
        sex: this.sex,
        birthDate: this.dateFormatted,
      };
      const status = await this.$store.dispatch("register/createUser", registeredData);
      if(status){
        this.$router.push("/")
      }
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
};
</script>

<style>
</style>