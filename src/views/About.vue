<template>
  <div>
    <header></header>
    <main>
      <NavBar />
      <p>this is my about page.</p>
    </main>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "About",
  components: {
    NavBar,
  },
};
</script>

