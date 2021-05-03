<template>
  <v-app light>
    <Appbar></Appbar>
    <v-main>
      <v-container style="padding:30px">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer color="#4dadbd" dark>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon>
          <v-icon>mdi-copyright</v-icon>
        </v-btn>
        Copyright 2020-2021
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>