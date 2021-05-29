<template>
  <div>
    <Feed />
    <NavBar />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Feed from "../components/Feed.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    Feed,
  },
};
</script>
