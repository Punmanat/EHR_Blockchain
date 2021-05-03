<template>
  <v-row>
    <v-col v-for="(item, i) in encounters" :key="i" cols="12">
      <v-card :color="color" dark>
        <div class="d-flex flex-no-wrap justify-space-between" style="color:#4a4343">
          <div>
            <v-card-title class="headline">
              เลขที่การตรวจ : {{ item.id }} <br />
              วันที่และเวลา : {{ item.issued }}
            </v-card-title>
            <v-card-text class="title"
              ><b>เหตุผลที่มา</b> : {{ item.reasonCode }}<br />
              <b>สถานะ</b> : {{ item.class }} <br />
              <b>สถานที่ตรวจ</b> : {{ item.serviceProvider }} <br />
              <b>รหัสประจำตัวพยาบาลที่ตรวจ</b> :
              {{ item.participant }}</v-card-text
            >
            <v-card-actions>
              <v-btn rounded color="#678aa5" @click="goToObservation(item.id)">
                ดูผลการวินิจฉัย
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    color: "#add9d8",
    encounters: [],
  }),
  methods: {
    goToObservation(encounterId) {
      this.$router.push({
        path: `/history/observation/${encounterId}`,
      });
    },
  },
  async created() {
    await this.$store.dispatch("user/getEncounters", this.$store.state.user.profile.personalId);
    this.encounters = this.$store.state.user.encounters;
  },
};
</script>

<style>
</style>