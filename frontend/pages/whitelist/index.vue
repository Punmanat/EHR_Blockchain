<template>
  <div>
    <v-form>
      <v-text-field label="รหัสประจำตัวบุคคลากรทางการแพทย์"></v-text-field>
      <v-checkbox label="ยินยอมการเปิดเผยข้อมูลส่วนตัว"></v-checkbox>
      <div class="text-center">
        <v-btn rounded color="primary" large style="width:80%;" @click="confirm()">ยืนยัน</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  methods: {
    confirm() {},
  },
};
</script>

<style>

</style>