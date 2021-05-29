<template>
  <v-app style="padding-top: 60px">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
  </v-app>
</template>

<script>
import Post from "./Post.vue";
export default {
  name: "Feed",
  components: {
    Post,
  },
  data: () => ({}),
};
</script>
