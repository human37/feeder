<template>
  <div>
    <v-navigation-drawer v-model="drawer_open" app floating>
      <SideBar @refreshRequest="$emit('refreshRequest')" />
    </v-navigation-drawer>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer_open = !drawer_open">
        <div v-if="!if_mobile">
          <v-icon v-if="drawer_open">mdi-arrow-left</v-icon>
          <v-icon v-else>mdi-arrow-right</v-icon>
        </div>
      </v-app-bar-nav-icon>
      <v-app-bar-title>feeder</v-app-bar-title>
      <v-spacer></v-spacer>
      <NavIcons
        @refreshRequest="$emit('refreshRequest')"
        @addNewFeed="addNewFeed"
      />
    </v-app-bar>
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import NavIcons from "./NavIcons.vue";
import { isMobile } from "mobile-device-detect";
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  components: {
    SideBar,
    NavIcons,
  },
  data: () => ({
    if_mobile: isMobile,
    drawer_open: !isMobile,
    feeds_list: JSON.parse(localStorage.getItem("feeds")) || [],
    old_all_selected: [],
    new_all_selected: [],
  }),
  methods: {
    ...mapActions(["addNewFeed"]),
  },
};
</script>
