<template>
  <div>
    <v-alert type="success" v-show="alert_success">บันทึกข้อมูลสำเร็จ</v-alert>
    <v-alert type="error" v-show="alert_error">บันทึกข้อมูลล้มเลว</v-alert>
    <div class="text-center">
      <h2>กรอกประวัติเบื้องต้น</h2>
      <hr class="my-1" />
      <div class="d-flex flex-row justify-space-around">
        <div>
          <h4>ชื่อ</h4>
          <p>{{ patientProfile.firstName }} {{ patientProfile.lastName }}</p>
        </div>
        <div>
          <h4>เลขบัตรประชาชน</h4>
          <p>
            {{
              $route.params.personalId == null ? "-" : $route.params.personalId
            }}
          </p>
        </div>
      </div>
    </div>
    <v-form>
      <v-select
        :items="typePatient"
        label="ประเภทผู้ป่วย"
        v-model="class_"
      ></v-select>
      <v-select
        :items="provider"
        label="ประเภทผู้ให้บริการ"
        v-model="serviceProvider"
      ></v-select>
      <v-text-field label="น้ำหนัก" v-model="weight"></v-text-field>
      <v-text-field label="ส่วนสูง" v-model="height"></v-text-field>
      <v-text-field label="ความดัน" v-model="pressure"></v-text-field>
      <v-textarea
        label="อาการเบื้องต้น"
        outlined
        v-model="reasonCode"
      ></v-textarea>
      <v-btn block color="#dadf74" rounded @click="confirm()">ยืนยัน</v-btn>
      <v-btn block color="#aabba5" rounded class="mt-2" @click="back()"
        >ย้อนกลับ</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  layout: "practitioner",
  created() {
    this.patientProfile = this.$store.state.user.patientProfile;
  },
  data() {
    return {
      alert_success: false,
      alert_error: false,
      typePatient: ["Inpatient", "Outpatient"],
      provider: ["Hospital", "Clinic", "Others"],
      patientProfile: {},
      weight: null,
      height: null,
      pressure: null,
      class_: "",
      serviceProvider: "",
      reasonCode: "",
    };
  },
  methods: {
    async confirm() {
      let encounter = {
        resourceType: "Encounter",
        id: uuidv4(),
        class: this.class_,
        subject: this.patientProfile.personalId,
        participant: this.$store.state.user.profile.id,
        serviceProvider: this.serviceProvider,
        issued: new Date(),
        reasonCode: this.reasonCode,
      };

      let observation1 = {
        resourceType: "Observation",
        id: uuidv4(),
        category: "Vital signs",
        code: "bodyweight",
        subject: this.patientProfile.personalId,
        performer: this.$store.state.user.profile.id,
        encounterId: encounter.id,
        issued: new Date(),
        valueQuantity: [
          {
            value: this.weight,
            unit: "kg",
          },
        ],
      };

      let observation2 = {
        resourceType: "Observation",
        id: uuidv4(),
        category: "Vital signs",
        code: "bodyheight",
        subject: this.patientProfile.personalId,
        performer: this.$store.state.user.profile.id,
        encounterId: encounter.id,
        issued: new Date(),
        valueQuantity: [
          {
            value: this.height,
            unit: "cm",
          },
        ],
      };
      let observation3 = {
        resourceType: "Observation",
        id: uuidv4(),
        category: "Vital signs",
        code: "pressure",
        subject: this.patientProfile.personalId,
        performer: this.$store.state.user.profile.id,
        encounterId: encounter.id,
        issued: new Date(),
        valueQuantity: [
          {
            value: this.pressure,
            unit: "mmHg",
          },
        ],
      };

      const status = await this.$store.dispatch("user/setEncounter", encounter);
      const status1 = await this.$store.dispatch(
        "user/setObservation",
        observation1
      );
      const status2 = await this.$store.dispatch(
        "user/setObservation",
        observation2
      );
      const status3 = await this.$store.dispatch(
        "user/setObservation",
        observation3
      );
      if (status && status1 && status2 && status3) {
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