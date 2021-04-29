<template>
  <div>
    <v-alert type="success" v-show="alert_success">บันทึกข้อมูลสำเร็จ</v-alert>
    <v-alert type="error" v-show="alert_error">บันทึกข้อมูลล้มเลว</v-alert>
    <div class="text-center">
      <h2>กรอกประวัติการแพ้</h2>
      <hr class="my-1" />
      <div class="d-flex flex-row justify-space-around">
        <div>
          <h4>ชื่อ</h4>
          <p>{{ patientProfile.firstName }} {{ patientProfile.lastName }}</p>
        </div>
        <div>
          <h4>เลขบัตรประชาชน</h4>
          <p>
            {{ patientProfile.personalId }}
          </p>
        </div>
      </div>
    </div>
    <v-form>
      <v-select
        :items="typeCategory"
        label="ประเภทการแพ้"
        v-model="category"
      ></v-select>
      <v-select
        :items="typeCriticality"
        label="ระดับความรุนแรง"
        v-model="criticality"
      ></v-select>
      <v-text-field
        label="สิ่งที่แพ้ (ใส่ลูกน้ำตามด้วยช่องว่าง)"
        v-model="code"
        placeholder="ยำ, แมว, ไก่"
      ></v-text-field>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="computedDateFormatted1"
            label="มีอาการครั้งแรกเมื่อใด"
            persistent-hint
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="onset"
          no-title
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="computedDateFormatted2"
            label="มีอาการล่าสุดเมื่อใด"
            persistent-hint
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="lastOccurence"
          no-title
          @input="menu1 = false"
        ></v-date-picker>
      </v-menu>
      <v-textarea label="อาการเบื้องต้น" outlined v-model="note"></v-textarea>
      <v-btn block color="primary" rounded @click="confirm()">ยืนยัน</v-btn>
      <v-btn block color="primary" rounded class="mt-2" @click="back()"
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
      patientProfile: {},
      typeCategory: ["Medicine", "Food", "Animal"],
      category: "",
      typeCriticality: ["Low", "medium", "High"],
      criticality: "",
      code: "",
      onset: new Date().toISOString().substr(0, 10),
      lastOccurence: new Date().toISOString().substr(0, 10),
      note: "",
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      menu1: false,
      menu2: false,
    };
  },
  methods: {
    async confirm() {
      let allergyIntolerance = {
        resourceType: "AllergyIntolerance",
        id: uuidv4(),
        category: this.category,
        criticality: this.criticality,
        code:this.code.split(", "),
        patient: this.patientProfile.personalId,
        onset: this.computedDateFormatted1,
        recordedDate: this.formatDate(new Date().toISOString().substr(0, 10)),
        lastOccurence: this.computedDateFormatted2,
        note: this.note,
      }
      const status = await this.$store.dispatch(
        "user/setAllergyIntolerance",
        allergyIntolerance
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
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  computed: {
    computedDateFormatted1() {
      return this.formatDate(this.onset);
    },
    computedDateFormatted2() {
      return this.formatDate(this.lastOccurence);
    }
  },
};
</script>

<style>
</style>