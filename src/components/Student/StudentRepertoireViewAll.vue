<template>
  <v-container>
    <v-card elevation="0" class="pa-4 fullBorderCurve">
      <v-card-title class="font-weight-bold text-darkBlue mb-6">
        <v-row>
          <v-col cols="auto" class="pa-0 pt-1">
            <v-avatar class="pr-0">
              <v-icon>
                <font-awesome-icon
                  icon="fa-solid fa-compact-disc"
                  class="text-darkBlue" />
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
            <v-card-title class="font-weight-bold text-h5 pl-2"
              >Repertoire</v-card-title
            >
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row
          v-for="piece in this.userStore.userRoleInfo.repertoires[0].pieces">
          <RepertoireComponent :sentPiece="piece" />
        </v-row>
      </v-card-text>
      <v-card-actions class="ml-auto pa-0 pr-1">
        <v-btn
          rounded="lg"
          elevation="0"
          class="text-none buttonCancel ml-auto text-white font-weight-bold"
          @click="closeViewAllDialog()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import RepertoireComponent from "./RepertoireComponent.vue";
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
      ...mapStores(useUserStore),
    },
    methods: {
      closeViewAllDialog() {
        this.$router.push({ path: "/dashboard" });
      },
    },
  };
</script>

<style scoped></style>
