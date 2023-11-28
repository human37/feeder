<template>
  <div v-if="getPosts.length || getFeedRefreshing" id="feed">
    <div v-if="getFeedRefreshing" id="loading-circle">
      <v-progress-circular
        :value="getFeedRefreshingProgress"
        size="300"
        width="15"
      >
        {{ loading_message }}
      </v-progress-circular>
    </div>
    <div v-else>
      <Post
        v-for="post in getPosts"
        :key="post.link + post.feed_title"
        :title="post.title"
        :feed_title="post.feed_title"
        :creator="post.creator"
        :link="post.link"
        :date="post.date"
        :content="post.content"
      />
    </div>
  </div>
  <v-container style="height:100%" display="flex" v-else>
    <v-row justify="center" class="mt-16">
      No RSS feeds currently added, click below to add an example feed:
    </v-row>
    <v-row justify="center" class="mt-9">
      <v-btn text outlined @click="handleAddProgrammerRSSFeed">
        add programmer humor rss feed
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Post from "./Post.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Feed",
  components: {
    Post,
  },
  computed: {
    ...mapGetters([
      "getLoadingMessages",
      "getPosts",
      "getFeedRefreshing",
      "getFeedRefreshingProgress",
    ]),
  },
  data: () => ({
    loading_message: "refreshing...",
  }),
  watch: {
    feed_refreshing: function() {
      this.loading_message = this.getLoadingMessages[
        Math.floor(Math.random() * this.getLoadingMessages.length)
      ];
    },
  },
  methods: {
    ...mapActions(["addNewFeed", "refreshPostsFromFeeds"]),
    async handleAddProgrammerRSSFeed() {
      const feed = {
        title: "Programmer Humor",
        url: "https://www.reddit.com/r/ProgrammerHumor/.rss",
        is_on: true,
      };
      this.addNewFeed(feed);
      await this.refreshPostsFromFeeds();
    },
  },
};
</script>

<style scoped>
#feed {
  padding-top: 20px;
}
#loading-circle {
  text-align: center;
}
#no-content {
  text-align: center;
  padding-top: 20px;
  color: gray;
}
</style>
