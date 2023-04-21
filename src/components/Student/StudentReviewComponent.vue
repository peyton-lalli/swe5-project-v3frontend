<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">
          {{
            this.eventsStore.events.filter(
              (e) => e.eventId === this.event.eventId
            )[0].title
          }}
          Critique</v-col
        >
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeDialog()">
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
    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ date }}
    </v-card-subtitle>
    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ type }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <v-row justify="center" class="pl-5 pt-0 pb-0">
            <v-col cols="2" align-self="center">
              <v-avatar class="bg-darkBlue">
                <v-img :src="this.instructor.picture"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                Private Instructor
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ this.instructor.fName }} {{ this.instructor.lName }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center" class="pl-5 pt-0 pb-0 mt-0">
            <v-col cols="2" align-self="center">
              <v-avatar class="bg-darkBlue">
                <v-img :src="this.accompanist.picture"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                Accompanist
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ this.accompanist.fName }} {{ this.accompanist.lName }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-card-title class="pl-5 font-weight-bold text-darkGray">
              Musical Selection
            </v-card-title>
            <v-card-text>
              <v-card elevation="0" class="eventsGradient fullBorderCurve">
                <v-card-text class="pt-2">
                  <v-row justify="center" v-for="song in this.event.songs">
                    <v-col cols="1" align-self="center" class="mt-3 mr-5">
                      <v-avatar class="bg-darkBlue">
                        <v-img :src="song.piece.composer.picture"></v-img>
                      </v-avatar>
                    </v-col>
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
            </v-card-text>
          </v-row>
        </v-col>
        <v-col>
          <v-card-title class="font-weight-bold text-darkGray pl-0">
            Jurors
          </v-card-title>
          <v-card class="eventsGradient" elevation="0">
            <v-row v-for="juror in this.event.jurors" class="pl-3 pb-3">
              <v-card-text class="pl-0">
                <v-row justify="center" class="pl-5 mt-0">
                  <v-col cols="1" align-self="center">
                    <v-avatar class="bg-darkBlue">
                      <v-img :src="juror.picture"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="11">
                    <v-card-title
                      class="text-darkBlue font-weight-bold pb-2 ml-3">
                      {{ juror.name }}
                    </v-card-title>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-title class="font-weight-bold text-darkGray pl-1">
            Critiques
          </v-card-title>
          <v-card
            class="mainBlur rounded-lg"
            v-for="critique in this.event.critiques">
            <v-card-title class="text-darkBlue font-weight-bold">
              <v-row class="pt-3">
                <v-col cols="1" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <v-img :src="critique.eventsignupjuror.picture"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="10" align-self="center">
                  {{ critique.eventsignupjuror.name }}
                </v-col>
              </v-row>
            </v-card-title>

            <v-row>
              <v-col cols="3" class="pr-0">
                <v-card-text class="font-weight-bold">
                  Performance and Suggestions:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0">
                <v-card
                  rounded="lg"
                  class="bg-lightBlue pa-2 ma-4"
                  elevation="0">
                  <v-card-text class="ma-0 pa-0">
                    {{ critique.critiqueText }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="pr-0 py-0">
                <v-card-text class="font-weight-bold py-0">
                  Deportment Rating:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0 py-0">
                <v-btn
                  class="outlined ml-3"
                  rounded="pill"
                  size="small"
                  elevation="0">
                  {{ critique.deportmentRating }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pr-0">
                <v-card-text class="font-weight-bold">
                  Deportment Comments:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0">
                <v-card
                  rounded="lg"
                  class="bg-lightBlue pa-2 ma-4"
                  elevation="0">
                  <v-card-text class="ma-0 pa-0">
                    {{ critique.deportment }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="pr-0 py-0">
                <v-card-text class="font-weight-bold py-0">
                  Diction Rating:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0 py-0">
                <v-btn
                  class="outlined ml-3"
                  rounded="pill"
                  size="small"
                  elevation="0">
                  {{ critique.dictionRating }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pr-0">
                <v-card-text class="font-weight-bold">
                  Diction Comments:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0">
                <v-card
                  rounded="lg"
                  class="bg-lightBlue pa-2 ma-4"
                  elevation="0">
                  <v-card-text class="ma-0 pa-0">
                    {{ critique.diction }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="pr-0 py-0">
                <v-card-text class="font-weight-bold py-0">
                  Tone Rating:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0 py-0">
                <v-btn
                  class="outlined ml-3"
                  rounded="pill"
                  size="small"
                  elevation="0">
                  {{ critique.toneRating }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pr-0">
                <v-card-text class="font-weight-bold">
                  Tone Comments:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0">
                <v-card
                  rounded="lg"
                  class="bg-lightBlue pa-2 ma-4"
                  elevation="0">
                  <v-card-text class="ma-0 pa-0">
                    {{ critique.tone }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="pr-0 py-0">
                <v-card-text class="font-weight-bold py-0">
                  Interpretation, Musicianship Rating:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0 py-0">
                <v-btn
                  class="outlined ml-3"
                  rounded="pill"
                  size="small"
                  elevation="0">
                  {{ critique.interpretationRating }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pr-0">
                <v-card-text class="font-weight-bold">
                  Interpretation, Musicianship Comments:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0">
                <v-card
                  rounded="lg"
                  class="bg-lightBlue pa-2 ma-4"
                  elevation="0">
                  <v-card-text class="ma-0 pa-0">
                    {{ critique.interpretation }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="pr-0 py-0">
                <v-card-text class="font-weight-bold py-0">
                  Accuracy/Intonation Rating:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0 py-0">
                <v-btn
                  class="outlined ml-3"
                  rounded="pill"
                  size="small"
                  elevation="0">
                  {{ critique.accuracyRating }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pr-0">
                <v-card-text class="font-weight-bold">
                  Accuracy/Intonation Comments:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0">
                <v-card
                  rounded="lg"
                  class="bg-lightBlue pa-2 ma-4"
                  elevation="0">
                  <v-card-text class="ma-0 pa-0">
                    {{ critique.accuracy }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="pr-0 py-0">
                <v-card-text class="font-weight-bold py-0">
                  Balance Rating:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0 py-0">
                <v-btn
                  class="outlined ml-3"
                  rounded="pill"
                  size="small"
                  elevation="0">
                  {{ critique.balanceRating }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pr-0">
                <v-card-text class="font-weight-bold">
                  Balance Comments:
                </v-card-text>
              </v-col>
              <v-col :cols="9" class="pl-0">
                <v-card
                  rounded="lg"
                  class="bg-lightBlue pa-2 ma-4"
                  elevation="0">
                  <v-card-text class="ma-0 pa-0">
                    {{ critique.balance }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "StudentReviewComponent",
    components: {},
    data() {
      return {
        critiqueText: "",
        date: "",
        type: "",
        accompanist: {},
        instructor: {},
      };
    },
    props: {
      event: {},
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    methods: {
      closeDialog() {
        this.$emit("closeDialogEvent", false);
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
      async getAccompanist() {
        let accompanist = await this.userStore.getAccompanistInfo(
          this.event.accompanistId
        );
        this.accompanist = accompanist.Accompanists[0].user;
      },
      async getInstructor() {
        let instructor = await this.userStore.getInstructorInfo(
          this.event.instructorId
        );
        this.instructor = instructor.Instructors[0].user;
      },
    },
    async mounted() {
      this.findInstrument();
      this.date = this.getDate();
      await this.getAccompanist();
      await this.getInstructor();
    },
  };
</script>

<style scoped>
  .outlined.v-btn {
    background: linear-gradient(white, white) padding-box,
      linear-gradient(to right, #aabed2, #ddeaf6) border-box;
    border-radius: 50em;
    border: 4px solid transparent;
  }
</style>
