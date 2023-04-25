<template>
  <v-container fluid class="eventComponent px-2">
    <v-card class="mainCardBorder pt-6 px-6 pb-6">
      <v-row class="pa-0">
        <v-col class="pa-0">
          <v-card-title class="font-weight-bold text-black pl-2 pt-0">
            {{
              this.eventsStore.events.filter(
                (e) => e.eventId === this.event.eventId
              )[0].title
            }}
            Critique
          </v-card-title>
        </v-col>
        <v-col class="text-right pt-2">
          <v-btn
            class="outlined text-capitalize font-weight-bold text-darkBlue"
            rounded="pill"
            size="small"
            elevation="0"
            >{{ type }}</v-btn
          >
        </v-col>
      </v-row>
      <v-card-subtitle class="font-weight-bold text-lightBlue pl-0">
        {{ date }}
      </v-card-subtitle>
      <v-card-title class="font-weight-bold text-darkBlue pt-5 pl-0">
        Jurors
      </v-card-title>
      <v-card-text class="pl-0 pt-0">
        <v-row class="pl-0 pt-0">
          <v-col
            v-for="juror in this.event.jurors"
            cols="10"
            :xl="5"
            class="pt-0">
            <v-row>
              <v-col cols="1" align-self="center">
                <v-avatar class="bg-mediumBlue" size="32">
                  <v-img :src="juror.picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col>
                <v-card-title
                  class="text-mediumBlue font-weight-semi-bold pb-2 pl-0 ml-4 text-body-1">
                  {{ juror.name }}
                </v-card-title>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card class="mb-0 lightCardBorder">
        <v-card-title class="font-weight-bold text-darkBlue pb-2">
          Musical Selection
        </v-card-title>
        <v-card-text class="pl-0">
          <v-row justify="center" v-for="song in this.event.songs">
            <v-col align-self="center" class="pt-0">
              <v-card-text class="pb-0 mb-0 font-weight-bold text-body-1">
                {{ song.piece.name }}
              </v-card-text>
              <v-card-text
                class="text-darkBlue font-weight-medium text-body-2 py-0">
                {{ song.piece.composer.name }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card-actions class="px-0 pb-0 pt-6">
        <v-btn
          @click="createDialog = true"
          elevation="0"
          size="small"
          class="buttonGradient ml-auto text-white font-weight-bold text-none buttonBorder">
          View full critique
        </v-btn>
        <v-dialog v-model="createDialog" max-width="900px">
          <StudentReviewComponent
            :event="event"
            @closeDialogEvent="closeCreateDialog"></StudentReviewComponent>
        </v-dialog>
      </v-card-actions>
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
