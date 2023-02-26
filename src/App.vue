<template>
  <v-app>
    <v-main class="appGrid">
      <router-view class="mainSlot"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { useLoginStore } from "./stores/LoginStore.js";
export default {
  name: "App",
  components: {},
  data() {
    return {
      loginStore: useLoginStore(),
    };
  },
};
</script>

<style>
.appGrid {
  display: grid;
  grid-template-columns: minmax(auto, 1fr);
  grid-template-rows: minmax(auto, 1fr);
  grid-template-areas: "mainSlot";
}

.mainSlot {
  grid-area: mainSlot;
}
</style>
