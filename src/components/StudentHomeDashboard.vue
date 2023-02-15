<template>
  <!-- The bg-colors can be removed, I just have them here to be able to make sure the containers were correct  -->
  <v-row class="fill-height">
    <v-col cols="8" class="bg-yellow">
      <v-row class="fill-height">
        <v-col cols="12" class="bg-blue"> </v-col>
        <v-col cols="12" class="bg-purple"> </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" class="bg-red"> </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "StudentHomeDashboard",
    components: {},
    data() {},
  };
</script>

<style scoped>
  * {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
