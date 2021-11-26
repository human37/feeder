<template>
  <div>
    <v-navigation-drawer v-model="drawer_open" app floating>
      <SideBar
        :items="feeds_list"
        @refreshRequest="$emit('refreshRequest')"
        @itemSwitch="updateSwitch"
        @itemDelete="deleteFeed"
        @allSelectedChanged="allSelectedChanged"
      />
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
    updateSwitch(payload) {
      let feeds_list =
        JSON.parse(localStorage.getItem("feeds")) || this.feeds_list;
      if (payload.all_switch != undefined) {
        feeds_list.forEach((feed) => {
          feed.is_on = payload.all_switch;
        });
      } else {
        let index = feeds_list.findIndex((feed) => feed.url == payload.url);
        feeds_list[index].is_on = payload.is_on;
      }
      localStorage.setItem("feeds", JSON.stringify(feeds_list));
      this.feeds_list = feeds_list;
    },
    deleteFeed(payload) {
      this.feeds_list =
        JSON.parse(localStorage.getItem("feeds")) || this.feeds_list;
      this.feeds_list = this.feeds_list.filter(
        (feed) => feed.url != payload.url
      );
      localStorage.setItem("feeds", JSON.stringify(this.feeds_list));
    },
    addNewFeed(payload) {
      this.feeds_list = payload;
    },
    allSelectedChanged(payload) {
      this.new_all_selected = payload;
    },
  },
  watch: {
    // checks to see if the toggles were changed, and refreshes feed accordingly
    drawer_open: function() {
      if (!this.drawer_open) {
        if (this.old_all_selected != this.new_all_selected) {
          this.$emit("refreshRequest");
        }
        this.new_all_selected = this.old_all_selected;
      }
    },
  },
};
</script>
