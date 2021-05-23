<template>
  <div>
    <header></header>
    <main>
      <NavBar />
    </main>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "Home",
  components: {
    NavBar,
  },
};
</script>
