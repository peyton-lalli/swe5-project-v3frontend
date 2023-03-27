<template>
  <v-container>
    <v-card>
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col class="text-h5 font-weight-bold">Repertoire</v-col>
          <v-col class="text-right">
            <v-btn elevation="0" @click="closeViewAllDialog()">
              <v-icon>
                <font-awesome-icon
                  icon="a-solid fa-circle-xmark"
                  class="text-lightBlue">
                </font-awesome-icon>
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row v-for="piece in this.userStore.userRoleInfo.repertoire">
          <RepertoireComponent :sentPiece="piece" />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import RepertoireComponent from "./RepertoireComponent.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "Repertoire Component",
    components: {
      RepertoireComponent,
    },
    data() {
      return {};
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    methods: {
      closeViewAllDialog() {
        this.$emit("closeRepViewAllEvent", false);
      },
    },
  };
</script>

<style scoped></style>
