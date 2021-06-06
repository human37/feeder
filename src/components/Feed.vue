<template>
  <v-app id="feed">
    <Post
      v-for="post in posts"
      :key="post.title"
      :title="post.title"
      :sub_title="post.sub_title"
      :content="post.content"
    />
  </v-app>
</template>

<script>
import Post from "./Post.vue";
export default {
  name: "Feed",
  props: {
    posts: Array,
  },
  components: {
    Post,
  },
  data: () => ({}),
};
</script>

<style scoped>
#feed {
  padding-top: 60px;
}
</style>
