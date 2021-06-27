<template>
  <div id="app">
    <v-app>
      <header>
        <NavBar v-on:refreshRequest="refreshAllFeed" />
      </header>
      <main>
        <v-main>
          <Feed :posts="posts" :feed_refreshing="feed_refreshing" />
        </v-main>
      </main>
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Feed from "./components/Feed.vue";
import { refreshFeed } from "./utils.js";
export default {
  components: {
    NavBar,
    Feed,
  },
  data: () => ({
    feed_refreshing: false,
    posts: [
      { title: null, creator: null, link: null, date: null, content: null },
    ],
  }),
  methods: {
    async refreshAllFeed() {
      this.feed_refreshing = true;
      this.posts = await refreshFeed();
      this.feed_refreshing = false;
    },
  },
  created: async function() {
    this.refreshAllFeed();
  },
};
</script>
