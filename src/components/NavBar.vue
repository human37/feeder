<template>
  <v-app>
    <v-app-bar app dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>simple RSS</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="getData" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-rss</v-icon>
          </v-btn>
        </template>
        <span>Add RSS Feed</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-lightbulb-on-outline</v-icon>
          </v-btn>
        </template>
        <span>Toggle Day/Night Theme</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="getData" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Change Settings</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn to="/Login" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <span>Create Account or Login</span>
      </v-tooltip>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({}),
};
</script>

<style scoped>
</style>