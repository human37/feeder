<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <SideBar />
    </v-navigation-drawer>
    <v-app-bar app dense>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>simple RSS</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="getFeed" icon v-bind="attrs" v-on="on">
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
          <v-btn icon v-bind="attrs" v-on="on">
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
import SideBar from './SideBar.vue';
let Parser = require('rss-parser');
let parser = new Parser();
export default {
  name: 'NavBar',
  components: {
    SideBar,
  },
  methods: {
    getFeed() {
      let feed = parser.parseURL('https://www.reddit.com/.rss');
      console.log(feed.title);
      feed.items.forEach((item) => {
        console.log(item.title + ':' + item.link);
      });
    },
  },
  data: () => ({
    drawer: null,
  }),
};
</script>