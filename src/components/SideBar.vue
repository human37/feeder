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
      <v-switch
        v-model="all_switch"
        label="All"
        @change="$emit('itemSwitch', { all_switch: all_switch })"
        inset
      ></v-switch>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-switch
          v-model="item.is_on"
          :label="item.title"
          @change="$emit('itemSwitch', { url: item.url, is_on: item.is_on })"
          inset
        ></v-switch>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data: () => ({
    all_switch: false,
    all_selected: [],
  }),
  props: {
    items: {
      type: Array,
    },
  },
  watch: {
    items: function() {
      let all_selected = [];
      this.items.forEach((item) => {
        if (item.is_on) {
          all_selected.push(item);
        }
      });
      this.$emit('allSelectedChanged', all_selected);
    },
  },
};
</script>
