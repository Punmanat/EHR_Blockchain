<template>
  <div class="box-container">
    <div class="box-header">
      <p class="text-center" style="font-size:1.5em;margin-bottom:0;padding:5px">ข้อมูลส่วนตัว</p>
    </div>
    <v-card class="box-content">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline mb-2">
            <span class="text-decoration-underline">เลขบัตรประชาชน</span>
          </v-list-item-title>
          <v-list-item-subtitle>{{profile.personalId}}</v-list-item-subtitle>
          <!--  -->
          <v-list-item-title class="headline my-4">
            <span class="text-decoration-underline">ชื่อ</span>
          </v-list-item-title>
          <v-list-item-subtitle>{{profile.firstName}} {{profile.lastName}}</v-list-item-subtitle>
          <!--  -->
          <v-list-item-title class="headline my-4">
            <span class="text-decoration-underline">เพศ</span>
          </v-list-item-title>
          <v-list-item-subtitle>{{profile.gender}}</v-list-item-subtitle>
          <!--  -->
          <v-list-item-title class="headline my-4">
            <span class="text-decoration-underline">วันเกิด</span>
          </v-list-item-title>
          <v-list-item-subtitle>{{profile.birthDate}}</v-list-item-subtitle>
          <!--  -->
          <v-list-item-title class="headline my-4">
            <span class="text-decoration-underline">ที่อยู่</span>
          </v-list-item-title>
          <v-list-item-subtitle>{{profile.address}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <!-- Dialog -->
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <div class="text-center">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            large
            rounded
            class="box-btn btn-w"
          >ดูเลขบัญชี</v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title class="headline">เลขบัญชี</v-card-title>
        <v-card-text>
          {{walletAddress}}
          <v-btn text @click="copy(walletAddress)">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">ยืนยัน</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center mt-3">
      <v-btn color="primary" rounded large class="box-btn btn-w" @click="goToHistory()">ดูประวัติการรักษา</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  // for validate route
  validate() {
    return true;
  },
  created(){
    this.profile = this.$store.state.user.profile
    this.walletAddress = this.$store.state.user.walletAddress
    // console.log(this.$store.state.user.profile)
  },
  data() {
    return {
      dialog: false,
      walletAddress: "0x123asdkj2193012xck213",
      profile:{}
    };
  },
  methods: {
    async copy(text) {
      navigator.clipboard.writeText(text);
    },
    goToHistory(){
      this.$router.push('/history')
    }
  },
};
</script>

<style>
.box-container {
  position: absolute;
  width: 100%;
  left: 0;
}
.box-header {
  position: relative;
  width: 40%;
  height: auto;
  background-color: #6a1b9a;
  border-top-right-radius: 15px;
  color: white;
}
.box-content {
  width: 90%;
  margin: 10px auto;
}
.box-btn {
  width: 60%;
}
</style>