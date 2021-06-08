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
    posts: [
      { title: null, creator: null, link: null, date: null, content: null },
    ],
    feeds: [],
  }),
  methods: {
    compare(a, b) {
      if (a.date > b.date) {
        return -1;
      } else {
        return 1;
      }
    },
    async getFeed(url) {
      let data = await axios.post(
        "http://localhost:9000/.netlify/functions/getfeed",
        JSON.stringify({
          url: url,
        })
      );
      const stored_feed = this.feeds.findIndex((feed) => feed.url == url);
      if (stored_feed == -1) {
        this.feeds.push({ title: data.data.feed.title, url: url, is_on: true });
      } else {
        this.feeds[stored_feed].title = data.data.feed.title;
      }
      return data.data.feed.items.map((item) => ({
        title: item.title,
        creator: item.creator,
        link: item.link,
        date: item.pubDate,
        content: item.content,
      }));
    },
    async refreshFeed() {
      this.refreshing = true;
      this.feeds = JSON.parse(localStorage.getItem("feeds")) || this.feeds;
      this.posts = [];
      for (const feed of this.feeds) {
        if (feed.is_on) {
          this.posts.push.apply(this.posts, await this.getFeed(feed.url));
        }
      }
      localStorage.setItem("feeds", JSON.stringify(this.feeds));
      this.posts.sort(this.compare);
      this.refreshing = false;
    },
    storeURL() {
      if (this.input_url === null) {
        this.modal = false;
        return;
      }
      this.feeds = JSON.parse(localStorage.getItem("feeds")) || this.feeds;
      let new_feed = { title: null, url: this.input_url, is_on: true };
      const stored_feed = this.feeds.findIndex(
        (feed) => (feed.url = new_feed.url)
      );
      if (stored_feed == -1) {
        this.feeds.push(new_feed);
      } else {
        console.log("this feed already exists");
      }
      localStorage.setItem("feeds", JSON.stringify(this.feeds));
      this.input_url = null;
      this.modal = false;
      this.refreshFeed();
    },
  },
};
</script>

<style scoped>
#add-feed-modal {
  padding: 10px;
}
</style>
