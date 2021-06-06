<template>
  <div>
    <v-app>
      <v-navigation-drawer v-model="drawer" app temporary>
        <SideBar :items="feeds" />
      </v-navigation-drawer>
      <v-app-bar app dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>simple RSS</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-rss</v-icon>
            </v-btn>
          </template>
          <span>Add RSS Feed</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="refreshFeed" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
          <span>Refresh Feed</span>
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
      <Feed :posts="posts"/>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import SideBar from "./SideBar.vue";
import Feed from "./Feed.vue";
export default {
  name: "NavBar",
  components: {
    SideBar,
    Feed,
  },
  data: () => ({
    drawer: null,
    posts: [{ title: null, sub_title: null, content: null }],
    feeds: [{ title: "Reddit", icon: "mdi-reddit" }],
  }),
  methods: {
    async refreshFeed() {
      let feed = await axios.post(
        "http://localhost:9000/.netlify/functions/getfeed",
        JSON.stringify({
          url: "https://rss.art19.com/apology-line",
        })
      );
      console.log(feed);
      this.posts = feed.data.feed.items.map((item) => ({
        title: item.title,
        sub_title: item.pubDate,
        content: item.content,
      }));
    },
  },
};
</script>