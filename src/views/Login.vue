<template>
  <div>
    <SignUp />
    <v-app>
    <NavBar />
    </v-app>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SignUp from "../components/SignUp.vue";

export default {
  name: "Home",
  components: {
    SignUp,
    NavBar
  },
};
</script>
