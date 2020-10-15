<template>
  <v-app light>
    <AppbarPractitioner></AppbarPractitioner>
    <v-main>
      <v-container style="padding:30px">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer class="blue accent-4" dark>
      <v-spacer></v-spacer>
      <div>
        Made with
        <v-btn icon color="pink">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        by developer
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>