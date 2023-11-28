<template>
  <div id="app">
    <v-app>
      <header>
        <NavBar @refreshRequest="refreshFeed" />
      </header>
      <main style="height:100%">
        <v-main style="height:100%">
          <Feed />
        </v-main>
      </main>
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Feed from "./components/Feed.vue";
import { mapActions } from "vuex";
export default {
  components: {
    NavBar,
    Feed,
  },
  data: () => ({}),
  methods: {
    ...mapActions(["refreshPostsFromFeeds"]),
    async refreshFeed() {
      this.refreshPostsFromFeeds();
    },
  },
  created: async function() {
    this.refreshFeed();
  },
};
</script>

<style scoped>
body {
  max-width: 100%;
  overflow-x: hidden;
}
</style>
