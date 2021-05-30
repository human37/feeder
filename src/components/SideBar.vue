<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Feeds</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-subtitle>All</v-list-item-subtitle>
        </v-list-item-content>
        <v-switch inset color="primary"></v-switch>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        <v-switch inset color="primary"></v-switch>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data: () => ({
    items: [
      { title: "Twitter", icon: "mdi-twitter" },
      { title: "Reddit", icon: "mdi-reddit" },
      { title: "Jira", icon: "mdi-jira" },
      { title: "Medium", icon: "mdi-post" },
    ],
  }),
};
</script>