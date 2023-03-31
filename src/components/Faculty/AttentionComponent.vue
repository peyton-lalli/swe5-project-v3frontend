<template>
  <v-container fluid class="eventComponent pt-5">
    <v-row>
      <v-col>
        <v-card class="eventsGradient fullBorderCurve mainblur">
          <v-card class="ma-3 fullBorderCurve" elevation="0">
            <v-card-title class="font-weight-bold text-black">
              <v-row>
                <v-col class="pb-0">{{ eventData.type }} </v-col>
              </v-row>
            </v-card-title>
            <v-card-subtitle class="font-weight-bold text-darkBlue">
              {{ formatDate(eventData.date) }}
            </v-card-subtitle>
            <v-card-subtitle class="font-weight-bold text-darkBlue pb-1">
              {{ createTimesInfoString(eventData) }}
            </v-card-subtitle>
          </v-card>
          <v-card-actions class="pt-0">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonWhite text-mediumBlue font-weight-bold ml-1"
              @click="viewSignUpsDialog = true"
              v-if="this.userStore.userInfo.role == 'admin'">
              View Signups
            </v-btn>
            <v-dialog v-model="viewSignUpsDialog" max-width="1000px">
              <ViewSignUps
                :eventData="eventData"
                @closeViewSignUpsDialogEvent="
                  closeViewSignUpsDialog
                "></ViewSignUps>
            </v-dialog>
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
  import ViewSignUps from "./ViewSignUps.vue";
  import { useUserStore } from "../../stores/UserStore.js";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "AttentionComponent",
    components: {
      CritiqueListComponent,
      ViewSignUps,
    },
    data() {
      return {
        viewSignUpsDialog: false,
        critiqueDialog: false,
      };
    },
    props: {
      eventData: {},
    },
    methods: {
      printEvents(event) {
        console.log(event);
      },
      closeCritiqueDialog(val) {
        this.critiqueDialog = val;
      },
      closeViewSignUpsDialog(val) {
        this.viewSignUpsDialog = val;
      },
      formatDate(date) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString("us-EN", options);
      },
      createTimesInfoString(event) {
        let timesString = "";
        for (let i = 0; i < event.times.length; i++) {
          timesString +=
            this.get12HourTimeString(new Date(event.times[i].startTime)) +
            " - " +
            this.get12HourTimeString(new Date(event.times[i].endTime));
          if (i + 1 < event.times.length) {
            timesString += " & ";
          }
        }

        return timesString;
      },
      get12HourTimeString(t) {
        let hours = t.getHours();
        let suffix = hours >= 12 ? "PM" : "AM";
        hours = ((hours + 11) % 12) + 1;
        let minutes = t.getMinutes() === 0 ? "00" : t.getMinutes();
        return hours + ":" + minutes + suffix;
      },
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
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
