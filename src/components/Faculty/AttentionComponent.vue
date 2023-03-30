<template>
  <v-container fluid class="eventComponent pt-5">
    <v-row v-for="event in this.events">
      <v-col>
        <v-card class="eventsGradient fullBorderCurve mainblur">
          <v-card class="ma-3 fullBorderCurve" elevation="0">
            <v-card-title class="font-weight-bold text-black">
              <v-row>
                <v-col class="pb-0">{{ event.title }}</v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="font-weight-bold text-darkBlue">
              {{ event.date }}
            </v-card-subtitle>
            <v-card-subtitle class="font-weight-bold text-darkBlue pb-1">
              {{ event.time }}
            </v-card-subtitle>
          </v-card>
          <v-card-actions class="pt-0">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonWhite text-mediumBlue font-weight-bold ml-1">
              View Signups
            </v-btn>
            <v-btn
              @click="critiqueDialog = true"
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonWhite text-mediumBlue font-weight-bold"
              v-if="this.userStore.userInfo.role == 'faculty'">
              Critiques
            </v-btn>
            <v-dialog v-model="critiqueDialog" max-width="1000px">
              <CritiqueListComponent
                @closeCritiqueDialogEvent="
                  closeCritiqueDialog
                "></CritiqueListComponent>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CritiqueListComponent from "./CritiqueListComponent.vue";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "AttentionComponent",
    components: {
      CritiqueListComponent,
    },
    data() {
      return {
        critiqueDialog: false,
        events: [
          {
            title: "Vocal Jury",
            date: "04/22/2023",
            time: "1:00 PM - 5:00 PM",
          },
        ],
      };
    },
    methods: {
      closeCritiqueDialog(val) {
        this.critiqueDialog = val;
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .outlined.v-btn {
    background: linear-gradient(white, white) padding-box,
      linear-gradient(to right, #aabed2, #ddeaf6) border-box;
    border-radius: 50em;
    border: 4px solid transparent;
  }
  .outlined.v-card {
    background: linear-gradient(white, white) padding-box,
      linear-gradient(to right, #aabed2, #ddeaf6) border-box;
    border-radius: 10px;
    border: 7px solid transparent;
  }
</style>
