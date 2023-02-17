<template>
  <v-app>
    <v-main class="appGrid">
      <router-view class="mainSlot"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({}),
};
</script>

<style>
  .appGrid {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: "mainSlot";
  }

  .mainSlot {
    grid-area: mainSlot;
  }
</style>
