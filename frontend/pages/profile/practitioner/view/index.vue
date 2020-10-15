<template>
  <div class="box-container">
    <div class="box-header">
      <p class="text-center" style="font-size:1.5em;margin-bottom:0;padding:5px">ข้อมูลส่วนตัว</p>
    </div>
    <v-card class="box-content">
      <v-card-text>
        <div class="text-center">
          <h3>ชื่อ</h3>
          <p>ปุณมนัส นันสันติ</p>
          <hr />
        </div>
        <br />
        <div class="d-flex flex-row justify-space-around text-center">
          <div>
            <h3>ส่วนสูง</h3>
            <p>175</p>
          </div>
          <div>
            <h3>น้ำหนัก</h3>
            <p>70</p>
          </div>
        </div>
        <hr />
        <br />
        <div class="d-flex flex-row justify-space-around text-center">
          <div>
            <h3>กรุ็ปเลือด</h3>
            <p>A</p>
          </div>
          <div>
            <h3>ความดัน</h3>
            <p>120</p>
          </div>
        </div>
        <hr />
        <br />
        <div class="text-center">
          <h3>อาการ</h3>
          <p>ปวดศรีษะมากมีอาการปวดหัวตัวร้อน</p>
        </div>
        <hr />
        <br />
        <div class="text-center">
          <h3>ตรวจล่าสุด</h3>
          <p>12/09/2563</p>
        </div>
      </v-card-text>
    </v-card>
    <div class="text-center mt-3">
      <v-btn color="primary" rounded @click="observer()" large class="box-btn btn-w">กรอกผลการวินิจฉัย</v-btn>
    </div>
    <div class="text-center mt-3">
      <v-btn color="primary" rounded @click="back()" large class="box-btn btn-w">ย้อนกลับ</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: "practitioner",
  // for validate route
  validate() {
    return true;
  },
  data() {
    return {
      role: "Doctor",
      dialog: false,
      walletAddress: "0x123asdkj2193012xck213",
    };
  },
  methods: {
    observer() {
      this.$router.push("/profile/practitioner/observer");
    },
    back() {
      this.$router.go(-1);
    },
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