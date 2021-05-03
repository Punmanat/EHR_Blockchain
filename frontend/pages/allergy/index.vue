<template>
  <div>
    <v-alert type="danger" v-show="alert">ไม่พบข้อมูล</v-alert>
    <v-row>
      <v-col v-for="(item, i) in allergyIntolerances" :key="i" cols="12">
        <v-card color="#94b8ce" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">
                เลขที่การตรวจ : {{ item.id }} <br />
                หมวดหมู่ : {{ item.category }}
              </v-card-title>
              <v-card-text class="title"
                ><b>ความรุนแรงในการแพ้</b> : {{ item.criticality }}<br />
                <b>โค้ด</b> : {{ item.code }} <br />
                <b>วันที่เริ่มมีอาการ</b> : {{ item.onset }} <br />
                <b>วันที่เริ่มบันทึก</b> : {{ item.recordedDate }} <br />
                <b>วันที่เกิดอาการล่าสุด</b> : {{ item.lastOccurence }} <br />
                <b>คำอธิบายเพิ่มเติม</b> : {{ item.note }}</v-card-text
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("user/getAllergyIntolerances", this.$store.state.user.profile.personalId);
    this.allergyIntolerances = this.$store.state.user.allergyIntolerances;
    if (this.allergyIntolerances) {
      this.alert = false;
    }
  },
  data: () => ({
    allergyIntolerances: [],
    alert: true,
  }),
  methods: {
    goToObservation(id) {
      this.$router.push({
        path: `/medical/observation/${id}`,
      });
    },
  },
};
</script>

<style>
</style>