<template>
  <div>
    <v-alert type="error" v-show="alert"
      >คุณไม่มีสิทธิ์ดูข้อมูลส่วนตัว กรุณาให้ผู้ป่วยอนุญาติสิทธิ์</v-alert
    >
    <div class="d-flex flex-row justify-space-around text-center">
      <div>
        <h3>ชื่อ</h3>
        <p>{{ profile.name }}</p>
      </div>
      <div>
        <h3>เลขประจำตัว</h3>
        <p>{{ profile.id }}</p>
      </div>
    </div>
    <v-form>
      <v-text-field
        label="เลขบัตรประจำตัวประชาชนผู้ป่วย"
        v-model="personalId"
      ></v-text-field>
    </v-form>
    <div class="text-center">
      <v-btn
        v-show="role == 'Nurse'"
        color="#dadf74"
        dark
        large
        class="box-btn btn-w title"
        @click="encouter()"
        rounded
        ><span style='color:#4a4343'>กรอกประวัติเบื้องต้น</span></v-btn
      >
    </div>
    <div class="text-center">
      <v-btn
        v-show="role == 'Doctor'"
        color="#dadf74"
        dark
        large
        class="box-btn btn-w title"
        @click="find()"
        rounded
        ><span style='color:#4a4343'>ค้นหาประวัติผู้ป่วย</span></v-btn
      >
    </div>
    <div class="text-center">
      <v-btn
        v-show="role == 'Doctor' || 'Nurse'"
        color="#aabba5"
        dark
        large
        class="box-btn btn-w my-3 title"
        @click="createAllergy()"
        rounded
        ><span style='color:#4a4343'>กรอกประวัติการแพ้</span></v-btn
      >
    </div>
    <div class="text-center">
      <v-btn
        v-show="role == 'Doctor'"
        color="#add9d8"
        dark
        large
        @click="history()"
        class="btn-w mb-3 title"
        rounded
        ><span style='color:#4a4343'>ค้นหาประวัติการรักษา</span></v-btn
      >
    </div>
    <div class="text-center">
      <v-btn
        v-show="role == 'Doctor'"
        color="#94b8ce"
        dark
        large
        @click="allergy()"
        class="btn-w title"
        rounded
        ><span style='color:#4a4343'>ค้นหาประวัติการแพ้</span></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: "practitioner",
  created() {
    this.role = this.$store.getters["user/getRole"];
    this.profile = this.$store.getters["user/getProfile"];
  },
  data() {
    return {
      alert: false,
      role: "",
      profile: {},
      personalId: "",
    };
  },
  methods: {
    async find() {
      const whitelist = await this.$store.dispatch(
        "user/checkWhitelist",
        this.personalId
      );
      if (whitelist) {
        await this.$store.dispatch("user/getEncounter", this.personalId);
        await this.$store.dispatch(
          "user/getObservation",
          this.$store.state.user.encounter.id
        );
        return this.$router.push("/profile/practitioner/view");
      }
      this.alert = true;
      setInterval(() => {
        this.alert = false;
      }, 5000);
    },
    async createAllergy() {
      const status = await this.$store.dispatch(
        "user/checkWhitelist",
        this.personalId
      );
      if (status) {
        return this.$router.push({
          path: '/profile/practitioner/allergy',
        });
      }
      this.alert = true;
      setInterval(() => {
        this.alert = false;
      }, 5000);
    },
    async encouter() {
      const status = await this.$store.dispatch(
        "user/checkWhitelist",
        this.personalId
      );
      if (status) {
        return this.$router.push({
          path: `/profile/practitioner/encouter/${this.personalId}`,
        });
      }
      this.alert = true;
      setInterval(() => {
        this.alert = false;
      }, 5000);
    },
    async history() {
       const whitelist = await this.$store.dispatch(
        "user/checkWhitelist",
        this.personalId
      );
      if (whitelist) {
        await this.$store.dispatch("user/getEncounters", this.personalId);
        return this.$router.push("/profile/practitioner/history");
      }
      this.alert = true;
      setInterval(() => {
        this.alert = false;
      }, 5000);
    },
    async allergy() {
      const whitelist = await this.$store.dispatch(
        "user/checkWhitelist",
        this.personalId
      );
      if (whitelist) {
        await this.$store.dispatch("user/getAllergyIntolerances", this.personalId);
        return this.$router.push("/profile/practitioner/history/allergy");
      }
      this.$router.push("/allergy");
    },
  },
};
</script>

<style>
</style>