<template>
  <v-form>
    <!-- <h3 class="purple--text darken-1" >กรุณากรอกข้อมูลในช่องว่าง</h3> -->
    <v-text-field label="เลขบัตรประจำตัวประชาชน"></v-text-field>
    <v-text-field label="ชื่อ"></v-text-field>
    <v-text-field label="นามสกุล"></v-text-field>
    <v-text-field label="เบอร์โทร"></v-text-field>
     <v-select
          :items="sex"
          label="เพศ"
        ></v-select>
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
    <v-checkbox label="ยอมรับเงื่อนไขและข้อตกลงการใช้บริการ"></v-checkbox>
    <div class="text-center">
      <v-btn rounded color="primary" large style="width:80%;" @click="register()">ลงทะเบียน</v-btn>
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
      sex:[
          "ชาย","หญิง","อื่นๆ"
      ]
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    register(){
        this.$router.push("/profile/patient")
    }
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