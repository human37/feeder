<template>
  <v-app id="feed">
    <div v-if="refreshing" id="loading-circle">
      <v-progress-circular
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <Post
        v-for="post in posts"
        :key="post.title"
        :title="post.title"
        :sub_title="post.date"
        :content="post.content"
      />
    </div>
  </v-app>
</template>

<script>
import Post from "./Post.vue";
export default {
  name: "Feed",
  props: {
    posts: Array,
    refreshing: Boolean,
  },
  components: {
    Post,
  },
  data: () => ({}),
};
</script>

<style scoped>
#feed {
  padding-top: 70px;
}
#loading-circle {
  margin: auto;
}
</style>
