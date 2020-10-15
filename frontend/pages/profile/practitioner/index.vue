<template>
  <div>
    <div class="d-flex flex-row justify-space-around text-center">
      <div>
        <h3>ชื่อ</h3>
        <p>นานา พันธ์</p>
      </div>
      <div>
        <h3>เลขประจำตัว</h3>
        <p>123712312</p>
      </div>
    </div>
    <v-form>
      <v-text-field label="เลขบัตรประจำตัวประชาชนผู้ป่วย"></v-text-field>
      <!-- Dialog -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <div class="text-center">
            <v-btn
              v-show="role=='practitioner/doctor'"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              large
              class="box-btn btn-w"
              @click="find()"
              rounded
            >ค้นหาประวัติผู้ป่วย</v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title class="headline">เกิดปัญหา</v-card-title>
          <v-card-text>คุณไม่มีสิทธิ์ดูข้อมูลส่วนตัว</v-card-text>
          <v-card-text>
            <span style="color:red" class="mr-1">หมายเหตุ</span>กรุณาให้ผู้ป่วยอนุญาติสิทธิ์
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Dialog -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <div class="text-center">
            <v-btn
              v-show="role=='practitioner/nurse'"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              large
              class="box-btn btn-w"
              @click="encouter()"
              rounded
            >กรอกประวัติเบื้องต้น</v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title class="headline">เกิดปัญหา</v-card-title>
          <v-card-text>คุณไม่มีสิทธิ์ดูข้อมูลส่วนตัว</v-card-text>
          <v-card-text>
            <span style="color:red" class="mr-1">หมายเหตุ</span>กรุณาให้ผู้ป่วยอนุญาติสิทธิ์
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Dialog -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <div class="text-center">
            <v-btn
              v-show="role=='practitioner/doctor'"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              large
              @click="medical()"
              class="btn-w my-3"
              rounded
            >ค้นหาประวัติการรักษา</v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title class="headline">เกิดปัญหา</v-card-title>
          <v-card-text>คุณไม่มีสิทธิ์ดูข้อมูลส่วนตัว</v-card-text>
          <v-card-text>
            <span style="color:red" class="mr-1">หมายเหตุ</span>กรุณาให้ผู้ป่วยอนุญาติสิทธิ์
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Dialog -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <div class="text-center">
            <v-btn
              v-show="role=='practitioner/doctor'"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              large
              @click="allergy()"
              class="btn-w"
              rounded
            >ค้นหาประวัติการแพ้</v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title class="headline">เกิดปัญหา</v-card-title>
          <v-card-text>คุณไม่มีสิทธิ์ดูข้อมูลส่วนตัว</v-card-text>
          <v-card-text>
            <span style="color:red" class="mr-1">หมายเหตุ</span>กรุณาให้ผู้ป่วยอนุญาติสิทธิ์
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: "practitioner",
  data() {
    return {
      dialog: false,
      role: "practitioner/doctor",
    };
  },
  methods: {
    find() {
      //this.dialog = true;
      this.$router.push("/profile/practitioner/view");
    },
    encouter() {
      // this.dialog2 = true;
      const personalId = "1100277362911";
      this.$router.push({
        path: `/profile/practitioner/encouter/${personalId}`,
      });
    },
    medical() {
      this.$router.push("/medical");
    },
    allergy() {
      this.$router.push("/allergy");
    },
  },
};
</script>

<style>
</style>