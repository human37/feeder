<template>
  <div v-if="if_posts || feed_refreshing" id="feed">
    <div v-if="feed_refreshing" id="loading-circle">
      <v-progress-circular
        :value="feed_refreshing_progress"
        size="300"
        width="15"
      >
        {{ loading_message }}
      </v-progress-circular>
    </div>
    <div v-else>
      <Post
        v-for="post in posts"
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
export default {
  name: "Feed",
  props: {
    posts: Array,
    feed_refreshing: Boolean,
    feed_refreshing_progress: Number,
  },
  components: {
    Post,
  },
  computed: {
    if_posts: function() {
      return this.posts.length;
    },
  },
  data: () => ({
    loading_messages: [
      "ooga booga...",
      "raining packets...",
      "blockchain intensifying...",
      "loading NFT...",
      "never gonna give you up...",
      "never gonna let you down...",
      "hailing aliens...",
      "epic loading message...",
      "proving P = NP...",
      "killing zombies...",
      "battling GPT4...",
      "stealing the declaration of independence...",
      "hacking the pentagon...",
      "rewriting the linux kernel in rust...",
      "responding to microsoft acquisition offers...",
    ],
    loading_message: "refreshing...",
  }),
  watch: {
    feed_refreshing: function() {
      this.loading_message = this.loading_messages[
        Math.floor(Math.random() * this.loading_messages.length)
      ];
    },
  },
  methods: {
    handleAddProgrammerRSSFeed() {
      let feeds_list = JSON.parse(localStorage.getItem("feeds")) || [];
      feeds_list.push({
        title: "Programmer Humor",
        url: "https://www.reddit.com/r/ProgrammerHumor/.rss",
        is_on: true,
      });
      localStorage.setItem("feeds", JSON.stringify(feeds_list));
      this.$emit("refresh");
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
