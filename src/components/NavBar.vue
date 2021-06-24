<template>
  <div>
    <v-app>
      <v-navigation-drawer v-model="drawer" temporary app>
        <SideBar :items="feeds" v-on:itemSwitch="updateSwitch" />
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
              :loading="feed_validation_loading"
              :error-messages="input_error_message"
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
    input_error_message: null,
    feed_validation_loading: false,
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
    updateSwitch(payload) {
      if (payload.all_switch != undefined) {
        this.feeds.forEach((feed) => {
          feed.is_on = payload.all_switch;
        });
        localStorage.setItem("feeds", JSON.stringify(this.feeds));
        return;
      }
      let index = this.feeds.findIndex((feed) => feed.url == payload.url);
      this.feeds[index].is_on = payload.is_on;
      localStorage.setItem("feeds", JSON.stringify(this.feeds));
    },
    async getFeed(url, check_if_valid = false) {
      let data = await axios
        .post(
          "http://localhost:9000/.netlify/functions/getfeed",
          JSON.stringify({
            url: url,
          })
        )
        .catch((err) => {
          console.log(err);
        });
      if (check_if_valid) {
        if (data) {
          return true;
        } else {
          return false;
        }
      }
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
    async storeURL() {
      this.feed_validation_loading = true;
      this.input_error_message = null;
      if (this.input_url === null) {
        this.modal = false;
        return;
      }
      this.feeds = JSON.parse(localStorage.getItem("feeds")) || this.feeds;
      let new_feed = { title: null, url: this.input_url, is_on: true };
      const stored_feed = this.feeds.findIndex(
        (feed) => feed.url == new_feed.url
      );
      if (stored_feed == -1) {
        if (await this.getFeed(new_feed.url, true)) {
          this.feed_validation_loading = false;
          this.feeds.push(new_feed);
          localStorage.setItem("feeds", JSON.stringify(this.feeds));
          this.input_url = null;
          this.input_error_message = null;
          this.modal = false;
          this.refreshFeed();
        } else {
          this.feed_validation_loading = false;
          this.input_error_message = "this is a bad URL";
          console.log("this is a bad feed");
        }
      } else {
        console.log("this feed already exists");
        this.feed_validation_loading = false;
        this.input_error_message = "you already have this feed added";
      }
    },
  },
  watch: {
    modal: function() {
      this.input_error_message = null;
      this.input_url = null;
      this.feed_validation_loading = null;
    },
  },
  created: function() {
    this.input_url = null;
    this.input_error_message = null;
    this.feed_validation_loading = false;
    this.refreshFeed();
  },
};
</script>

<style scoped>
#add-feed-modal {
  padding: 10px;
}
</style>
|
