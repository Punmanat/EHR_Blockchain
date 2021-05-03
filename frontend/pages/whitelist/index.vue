<template>
  <div>
    <v-alert type="success" v-show="alert">ให้สิทธิ์การรักษาสำเร็จ</v-alert>
    <v-form>
      <v-text-field
        label="รหัสประจำตัวบุคคลากรทางการแพทย์"
        v-model="practitionerId"
      ></v-text-field>
      <v-checkbox label="ยินยอมการเปิดเผยข้อมูลส่วนตัว"></v-checkbox>
      <div class="text-center">
        <v-btn
          rounded
          color="#dadf74"
          large
          style="width: 80%"
          @click="confirm()"
          >ยืนยัน</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      practitionerId: "",
      alert: false,
    };
  },
  methods: {
    async confirm() {
      const status = await this.$store.dispatch(
        "user/setWhitelist",
        this.practitionerId
      );
      if (status) {
        this.alert = true;
        setInterval(() => {
          this.alert = false;
        }, 5000);
      }
    },
  },
};
</script>

<style>
</style>