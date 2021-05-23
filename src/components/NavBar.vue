<template>
  <v-card class="overflow-hidden">
    <v-app-bar dark hide-on-scroll flat >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Simple RSS Reader</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({}),
};
</script>
