<template>
  <div>
    <!-- appbar -->
    <v-app-bar color="blue accent-4" dense dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link to="/profile/practitioner" style="text-decoration:none;color:white;">K-EHR</nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <!-- navigator-drawer -->
    <v-navigation-drawer class="blue accent-4" dark fixed temporary v-model="drawer">
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link style="text-decoration:none;color:white;" :to="item.link">{{ item.title }}</nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          title: "หน้าแรก",
          icon: " mdi-home",
          link: "/profile/practitioner/",
        },
      ],
    };
  },
  methods:{
    logout(){
      this.$router.push("/")
    }
  }
};
</script>

<style>
</style>