<template>
  <div>
    <div class="text-center">
      <h2>กรอกประวัติเบื้องต้น</h2>
      <hr class="my-1" />
      <div class="d-flex flex-row justify-space-around">
        <div>
          <h4>ชื่อ</h4>
          <p>ปุณมนัส</p>
        </div>
        <div>
          <h4>เลขบัตรประชาชน</h4>
          <p>{{$route.params.personalId == null ? "-" : $route.params.personalId}}</p>
        </div>
      </div>
    </div>
    <v-form>
      <v-text-field label="น้ำหนัก"></v-text-field>
      <v-text-field label="ส่วนสูง"></v-text-field>
      <v-text-field label="ความดัน"></v-text-field>
      <v-textarea label="อาการเบื้องต้น" outlined></v-textarea>
      <v-btn block color="primary" rounded>ยืนยัน</v-btn>
      <v-btn block color="primary" rounded class="mt-2" @click="back()">ย้อนกลับ</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: "practitioner",
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>