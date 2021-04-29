<template>
  <div>
    <v-alert type="success" v-show="alert_success">บันทึกข้อมูลสำเร็จ</v-alert>
    <v-alert type="error" v-show="alert_error">บันทึกข้อมูลล้มเลว</v-alert>
    <v-form>
      <v-text-field
        label="category"
        v-model="observation.category"
      ></v-text-field>
      <v-text-field label="code" v-model="observation.code"></v-text-field>
      <v-text-field
        label="subject"
        v-model="observation.subject"
      ></v-text-field>
      <v-text-field
        label="performer"
        v-model="observation.performer"
      ></v-text-field>
      <v-text-field label="value" v-model="value"></v-text-field>
      <div class="text-center">
        <v-btn color="primary" rounded class="btn-w" large @click="confirm()"
          >ยืนยัน</v-btn
        >
        <v-btn
          color="primary"
          rounded
          @click="back()"
          class="box-btn mt-3 btn-w"
          large
          >ย้อนกลับ</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  layout: "practitioner",
  data() {
    return {
      alert_success: false,
      alert_error: false,
      value: "",
      observation: {
        resourceType: "Observation",
        id: uuidv4(),
        category: "",
        code: "",
        subject: "",
        issued: "",
        performer: "",
        encounterId: "",
        valueQuantity: {},
      },
    };
  },
  created() {
    this.observation.encounterId = this.$store.state.user.encounter.id;
    this.observation.subject = this.$store.state.user.patientProfile.personalId;
    this.observation.performer = this.$store.state.user.profile.id;
  },
  methods: {
    async confirm() {
      this.observation.issued = new Date();
      this.observation.valueQuantity = {
        value: this.value,
      };
      const status = await this.$store.dispatch(
        "user/setObservation",
        this.observation
      );
      if (status) {
        this.alert_success = true;
        setInterval(() => {
          this.alert_success = false;
        }, 3000);
      } else {
        this.alert_error = true;
        setInterval(() => {
          this.alert_error = false;
        }, 3000);
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>