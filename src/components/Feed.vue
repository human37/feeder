<template>
  <v-app id='feed'>
    <Post title='Epic lil Nax X post' content='If you’re looking to write clearer Vue code, an important technique is to verify your props. In short, this means that you need to specify the requirements for your prop (i.e. type, format, and so on). If one of these requirements is not met (e.g. if the prop is passed an incorrect type), Vue will print out a warning.' sub_title='social'/>
    <Post title='Moderna Vaccine' content='ortant technique is to verify your props. In short, this means that you need to specify the requirements for your prop (i.e. type, format, and so on). If one of these requirements is not met (e.g. if the prop is passed an incorrect type), Vue will print out a warning.' sub_title='social'/>
  </v-app>
</template>

<script>
import Post from './Post.vue';
export default {
  name: 'Feed',
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
