<template>
  <div>
    <v-app>
      <v-navigation-drawer v-model="drawer" temporary app>
        <SideBar :items="feeds" />
      </v-navigation-drawer>
      <v-app-bar app dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>simple RSS</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="modal = true" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-rss</v-icon>
            </v-btn>
          </template>
          <span>Add RSS Feed</span>
        </v-tooltip>
        <v-dialog v-model="modal" max-width="490">
          <v-card id="add-feed-modal">
            <v-text-field
              label="Enter your RSS feed URL"
              :value="input_url"
              @change="input_url = $event"
              required
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="modal = false"> Cancel </v-btn>
              <v-btn text @click="storeURL"> Add </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      <Feed :posts="posts" :refreshing="refreshing" />
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
    modal: false,
    input_url: null,
    refreshing: false,
    posts: [{ title: null, date: null, content: null }],
    feeds: [{ title: "Reddit", icon: "mdi-reddit" }],
  }),
  methods: {
    compare(a, b) {
      if (a.date < b.date) {
        return -1;
      } else {
        return 1;
      }
    },
    async getFeed(url) {
      console.log(url);
      let data = await axios.post(
        "http://localhost:9000/.netlify/functions/getfeed",
        JSON.stringify({
          url: url,
        })
      );
      return data.data.feed.items.map((item) => ({
        title: item.title,
        date: item.pubDate,
        content: item.content,
      }));
    },
    async refreshFeed() {
      this.refreshing = true;
      let urls = JSON.parse(localStorage.getItem("urls")) || [];
      for (const url of urls) {
        this.posts = await this.getFeed(url);
      }
      this.posts.sort(this.compare);
      this.refreshing = false;
    },
    storeURL() {
      if (this.input_url === null) {
        this.modal = false;
        return;
      }
      let stored_data = JSON.parse(localStorage.getItem("urls")) || [];
      stored_data.push(this.input_url);
      console.log(stored_data);
      localStorage.setItem("urls", JSON.stringify(stored_data));
      this.input_url = null;
      this.modal = false;
    },
  },
};
</script>

<style scoped>
#add-feed-modal {
  padding: 10px;
}
</style>