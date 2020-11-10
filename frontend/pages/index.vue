<template>
  <div class="d-flex flex-column justify-center">
    <v-img rounded style="border-radius:20px" src="/logo.jpg" aspect-ratio="3"></v-img>
    <v-form class="pt-1">
      <v-text-field v-model="username" label="ชื่อผู้ใช้งาน"></v-text-field>
      <v-text-field
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        label="รหัสผ่าน"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      ></v-text-field>
      <br />
      <div class="text-center">
        <v-btn rounded color="primary" large style="width:80%;" @click="login()">เข้าสู่ระบบ</v-btn>
        <br />
        <v-btn text small class="mt-1" @click="register()">ลงทะเบียน</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$store.state.profile.list;
    },
  },
  data() {
    return {
      username: "",
      password: "",
      show: false,
    };
  },
  methods: {
    hello() {
      console.log("hello");
      this.$store.commit("profile/add", "Hello");
    },
    login() {
      const role = "practitione";
      if (role == "practitioner") {
        return this.$router.push("/profile/practitioner");
      }
      this.$router.push("/profile/patient");
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
</style>