<template>
  <div>
    <v-navigation-drawer v-model="drawer_open" temporary app flat>
      <SideBar :items="feeds_list" v-on:itemSwitch="updateSwitch" />
    </v-navigation-drawer>
    <v-app-bar app dense flat>
      <v-app-bar-nav-icon
        @click="drawer_open = !drawer_open"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>simple RSS</v-app-bar-title>
      <v-spacer></v-spacer>
      <ToolTips v-on:refreshRequest="$emit('refreshRequest')" />
    </v-app-bar>
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import ToolTips from "./ToolTips.vue";
export default {
  name: "NavBar",
  components: {
    SideBar,
    ToolTips,
  },
  data: () => ({
    drawer_open: false,
    feeds_list: JSON.parse(localStorage.getItem("feeds")) || [],
  }),
  methods: {
    updateSwitch(payload) {
      let feeds_list = JSON.parse(localStorage.getItem("feeds")) || [];
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
  },
};
</script>
