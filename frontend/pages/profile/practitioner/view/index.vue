<template>
  <div class="box-container">
    <div class="box-header">
      <p
        class="text-center"
        style="font-size: 1.5em; margin-bottom: 0; padding: 5px"
      >
        ข้อมูลผู้ป่วย
      </p>
    </div>
    <v-card class="box-content">
      <v-card-text>
        <div class="text-center">
          <h3 class="headline">ชื่อ</h3>
          <p class="title">
            {{ patientProfile.firstName }} {{ patientProfile.lastName }}
          </p>
          <hr />
        </div>
        <br />
        <div class="d-flex flex-row justify-space-around text-center">
          <div>
            <h3 class="headline">ส่วนสูง</h3>
            <p class="title">{{ height }}</p>
          </div>
          <div>
            <h3 class="headline">น้ำหนัก</h3>
            <p class="title">{{ weight }}</p>
          </div>
        </div>
        <hr />
        <br />
        <div class="d-flex flex-row justify-center text-center">
          <div>
            <h3 class="headline">ความดัน</h3>
            <p class="title" >{{ pressure }}</p>
          </div>
        </div>
        <hr />
        <br />
        <div class="text-center">
          <h3 class="headline">อาการ</h3>
          <p class="title">{{ encounter.reasonCode }}</p>
        </div>
        <hr />
        <br />
        <div class="text-center">
          <h3 class="headline">ตรวจล่าสุด</h3>
          <p class="title">{{ encounter.issued }}</p>
        </div>
      </v-card-text>
    </v-card>
    <div class="text-center mt-3">
      <v-btn
        color="#dadf74"
        rounded
        @click="observer()"
        large
        class="box-btn btn-w"
        >กรอกผลการวินิจฉัย</v-btn
      >
    </div>
    <div class="text-center mt-3">
      <v-btn color="#aabba5" rounded @click="back()" large class="box-btn btn-w"
        >ย้อนกลับ</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: "practitioner",
  created() {
    this.patientProfile = this.$store.state.user.patientProfile;
    this.encounter = this.$store.state.user.encounter;
    this.$store.state.user.observations.forEach((item) => {
      if (item.code == "bodyweight") {
        this.weight = item.valueQuantity[0].value;
      } else if (item.code == "bodyheight") {
        this.height = item.valueQuantity[0].value;
      } else if (item.code == "pressure") {
        this.pressure = item.valueQuantity[0].value;
      }
    });
  },
  // for validate route
  validate() {
    return true;
  },
  data() {
    return {
      role: "Doctor",
      dialog: false,
      walletAddress: "0x123asdkj2193012xck213",
      patientProfile: {},
      encounter: {},
      weight: "",
      height: "",
      pressure: "",
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
  position: relative;
  width: 100%;
  left: 0;
}
.box-header {
  position: relative;
  width: 40%;
  height: auto;
  background-color: #4d838c;
  border-radius: 15px;
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