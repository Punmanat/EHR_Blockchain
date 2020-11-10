<template>
  <v-row>
    <v-col v-for="(item, i) in items" :key="i" cols="12">
      <v-card :color="item.color" dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              เลขที่การตรวจ : {{ item.id }} <br />
              หมวดหมู่ : {{ item.category }}
            </v-card-title>
            <v-card-text
              ><b>ความรุนแรงในการแพ้</b> : {{ item.critically }}<br />
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
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: "#7fa4db",
        id: "11203",
        category: "อาหาร",
        critically: "สูง",
        code: "ถั่ว",
        onset: "25101999",
        recordedDate: "19052016",
        lastOccurence: "20062020",
        note: "แพ้ถั่วเขียว",
      },
     {
        color: "#7fa4db",
        id: "11203",
        category: "อาหาร",
        critically: "สูง",
        code: "ถั่ว",
        onset: "25101999",
        recordedDate: "19052016",
        lastOccurence: "20062020",
        note: "แพ้ถั่วเขียว",
      },
    ],
  }),
  methods:{
    goToObservation(id){
      this.$router.push({
        path: `/medical/observation/${id}`,
      });
    }
  }
};
</script>

<style>
</style>