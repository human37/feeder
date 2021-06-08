<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>mdi-rss</v-icon>
          Feeds
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-switch label="All"></v-switch>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-switch
          v-model="item.is_on"
          :label="item.title"
          @change="$emit('childToParent', { url: item.url, is_on: item.is_on })"
        ></v-switch>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      switch_state: true,
    };
  },
  props: {
    items: {
      type: Array,
    },
  },
};
</script>
