<template>
  <v-row>
    <v-col v-for="(item, i) in items" :key="i" cols="12">
      <v-card :color="item.color" dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              เลขที่การตรวจ : {{ item.id }} <br />
              วันที่และเวลา : {{ item.issued }}
            </v-card-title>
            <v-card-text
              ><b>เหตุผลที่มา</b> : {{ item.reasonCode }}<br />
              <b>สถานะ</b> : {{ item.class }} <br />
              <b>สถานที่ตรวจ</b> : {{ item.serviceProvider }} <br />
              <b>พยาบาลที่ตรวจ</b> : {{ item.participant }}</v-card-text
            >
            <v-card-actions>
              <v-btn rounded color="primary" @click="goToObservation(item.id)"> ดูผลการวินิจฉัย </v-btn>
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
    items: [
      {
        color: "#7fa4db",
        id: "11203",
        issued: "251064",
        serviceProvider: "โรงพยาบาลกรุงเทพคริสเตียน",
        reasonCode: "ปวดหัวและตัวร้อนมีไข้ 38 องศา",
        class: "ผู้ป่วยนอก",
        participant: "นางสาว แผนไทย",
      },
      {
        color: "#7fa4db",
        id: "11203",
        issued: "251064",
        serviceProvider: "โรงพยาบาลกรุงเทพคริสเตียน",
        reasonCode: "ปวดหัวและตัวร้อนมีไข้ 38 องศา",
        class: "ผู้ป่วยนอก",
        participant: "นางสาว แผนไทย",
      },
    ],
  }),
  methods:{
    goToObservation(id){
      this.$router.push({
        path: `/history/observation/${id}`,
      });
    }
  }
};
</script>

<style>
</style>