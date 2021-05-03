<template>
  <v-row>
    <v-col v-for="(item, i) in observations" :key="i" cols="12">
      <v-alert type="danger" v-if="not_found">ไม่พบข้อมูล</v-alert>
      <v-card color="#678aa5" dark v-else>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              เลขที่การตรวจ : {{ item.id }} <br />
              หมวดหมู่ : {{ item.category }} <br />
            </v-card-title>
            <v-card-text class="title"
              ><b>โค้ด</b> : {{ item.code }}<br />
              <b>ผลลัพธ์</b> : {{ item.valueQuantity }} <br />
              <b>แพทย์ที่ตรวจ</b> : {{ item.performer }}<br />
              <b>วันที่และเวลาการตรวจ</b> : {{ item.issued }}</v-card-text
            >
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "practitioner",
  async created() {
    this.observations = [];
    const status = await this.$store.dispatch(
      "user/getObservation",
      this.$route.params.id
    );
    if (!status) {
      return (this.not_found = true);
    }
    this.observations = this.$store.state.user.observations;
  },
  data: () => ({
    observations: [],
    not_found: false,
  }),
};
</script>

<style>
</style>