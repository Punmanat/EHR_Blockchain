<template>
  <v-row>
    <v-col v-for="(item, i) in items" :key="i" cols="12">
      <v-card :color="item.color" dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              เลขที่การตรวจ : {{ item.id }} <br />
              หมวดหมู่ : {{ item.category }} <br />
            </v-card-title>
            <v-card-text
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
  data: () => ({
    items: [
      {
        color: "#a684e3",
        id: "11203",
        category: "Vital signs",
        code: "bodyweight",
        issued: "251064",
        valueQuantity: "80 kg",
        performer: "นางสาว แผนไทย",
      },
      {
        color: "#a684e3",
        id: "11203",
        category: "Vital signs",
        code: "bodyweight",
        issued: "251064",
        valueQuantity: "โรงพยาบาลกรุงเทพคริสเตียน",
        performer: "นางสาว แผนไทย",
      },
    ],
  }),
};
</script>

<style>
</style>