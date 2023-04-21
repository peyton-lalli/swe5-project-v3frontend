<template>
  <v-container fluid class="eventComponent"
    ><v-card class="fullBorderCurve mainBlur">
      <v-card-title class="font-weight-bold text-black">
        <v-row>
          <v-col
            >{{
              this.eventsStore.events.filter(
                (e) => e.eventId === this.event.eventId
              )[0].title
            }}
            Critique</v-col
          >
          <v-col class="text-right">
            <v-btn class="outlined" rounded="pill" size="small" elevation="0">{{
              type
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle class="font-weight-medium text-mediumBlue">
        {{ date }}
      </v-card-subtitle>
      <v-card-title class="font-weight-bold text-darkBlue pt-5 ml-2">
        Jurors
      </v-card-title>
      <v-card-text class="pl-0">
        <v-row class="pl-6">
          <v-col v-for="juror in this.event.jurors" cols="10" :xl="5">
            <v-row>
              <v-col cols="1" align-self="center">
                <v-avatar class="bg-darkBlue">
                  <v-img :src="juror.picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col>
                <v-card-title class="text-darkBlue font-weight-bold pb-2 ml-3">
                  {{ juror.name }}
                </v-card-title>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card class="ma-5 outlined" elevation="0">
        <v-card-title class="font-weight-bold text-darkBlue">
          Musical Selection
        </v-card-title>
        <v-card-text class="pl-0">
          <v-row justify="center" v-for="song in this.event.songs">
            <v-col align-self="center">
              <v-card-title class="pb-0 font-weight-bold">
                {{ song.piece.name }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold">
                {{ song.piece.composer.name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card-text>
        <v-btn
          @click="createDialog = true"
          elevation="0"
          size="small"
          rounded="pill"
          class="buttonGradient mr-3 text-white font-weight-bold ml-1 mb-2">
          View Full Critique
        </v-btn>
        <v-dialog v-model="createDialog" persistent max-width="800px">
          <StudentReviewComponent
            :event="event"
            @closeDialogEvent="closeCreateDialog"></StudentReviewComponent>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import StudentReviewComponent from "./StudentReviewComponent.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "CritiqueComponent",
    components: {
      StudentReviewComponent,
    },
    props: {
      event: {},
    },
    data() {
      return {
        createDialog: false,
        title: "Vocal Jury Critique",
        type: "",
        date: "",
      };
    },
    methods: {
      closeCreateDialog(val) {
        this.createDialog = val;
      },
      findInstrument() {
        let studentInstrumentId =
          this.userStore.userRoleInfo.repertoires.filter(
            (r) => r.repertoireId === this.event.songs[0].piece.repertoireId
          )[0].studentinstrumentId;
        this.type = this.userStore.userRoleInfo.instruments.filter(
          (i) => i.studentinstrumentId === studentInstrumentId
        )[0].name;
      },
      getDate() {
        let date = new Date(
          this.eventsStore.events.filter(
            (e) => e.eventId === this.event.eventId
          )[0].date
        );
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return month + "/" + day + "/" + year;
      },
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      this.findInstrument();
      this.date = this.getDate();
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
