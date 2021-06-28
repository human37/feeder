<template>
  <div id="app">
    <v-app>
      <header>
        <NavBar v-on:refreshRequest="refreshFeed" />
      </header>
      <main>
        <v-main>
          <Feed
            :posts="posts"
            :feed_refreshing="feed_refreshing"
            :feed_refreshing_progress="feed_refreshing_progress"
          />
        </v-main>
      </main>
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Feed from "./components/Feed.vue";
import { getFeed } from "./utils.js";
export default {
  components: {
    NavBar,
    Feed,
  },
  data: () => ({
    feed_refreshing: true,
    feed_refreshing_progress: 0,
    posts: [
      { title: null, creator: null, link: null, date: null, content: null },
    ],
  }),
  methods: {
    compare(a, b) {
      if (a.date > b.date) {
        return -1;
      } else {
        return 1;
      }
    },
    async refreshFeed() {
      this.feed_refreshing = true;
      this.feed_refreshing_progress = 0;
      let posts = [];
      let feeds_list = JSON.parse(localStorage.getItem("feeds")) || [];
      let ratio = 2;
      for (const feed of feeds_list) {
        if (feed.is_on) {
          this.feed_refreshing_progress += 100 / ratio;
          posts.push.apply(posts, await getFeed(feed.url));
          ratio *= 2;
        }
      }
      this.feed_refreshing = false;
      this.feed_refreshing_progress = 1000;
      this.posts = posts.sort(this.compare);
    },
  },
  created: async function() {
    this.refreshFeed();
  },
};
</script>
