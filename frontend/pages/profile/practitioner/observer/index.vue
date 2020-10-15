<template>
  <div>
    <v-form>
      <v-text-field label="category"></v-text-field>
      <v-text-field label="code"></v-text-field>
      <v-text-field label="subject"></v-text-field>
      <v-text-field label="issued"></v-text-field>
      <v-text-field label="performer"></v-text-field>
      <v-text-field label="value"></v-text-field>
      <div class="text-center">
        <v-btn color="primary" rounded class="btn-w" large>ยืนยัน</v-btn>
        <v-btn color="primary" rounded @click="back()" class="box-btn mt-3 btn-w" large>ย้อนกลับ</v-btn>
      </div>
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