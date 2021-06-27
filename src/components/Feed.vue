<template>
  <div id="feed">
    <div v-if="feed_refreshing" id="loading-circle">
      <v-progress-circular indeterminate size="100"> </v-progress-circular>
    </div>
    <div v-else>
      <Post
        v-for="post in posts"
        :key="post.link"
        :title="post.title"
        :creator="post.creator"
        :link="post.link"
        :date="post.date"
        :content="post.content"
      />
    </div>
  </div>
</template>

<script>
import Post from "./Post.vue";
export default {
  name: "Feed",
  props: {
    posts: Array,
    feed_refreshing: Boolean,
  },
  components: {
    Post,
  },
  data: () => ({}),
};
</script>

<style scoped>
#feed {
  padding-top: 20px;
}
#loading-circle {
  text-align: center;
}
</style>
