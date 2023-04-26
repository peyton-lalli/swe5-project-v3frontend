<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-calendar"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">{{
            this.currentEvent.title
          }}</v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-0 px-2">
      <v-row class="pa-0">
        <v-col class="pa-0">
          <v-card-title class="font-weight-bold text-mediumBlue py-0">
            {{ formatDate(this.currentEvent.date) }}
          </v-card-title>
          <v-card-subtitle class="font-weight-bold text-lightBlue py-0">
            {{ createTimesInfoString(this.currentEvent.times) }}
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row class="pa-0 pt-2">
        <v-col class="pa-0">
          <v-card-title class="font-weight-bold text-darkGray pb-0">
            Students Attending
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
            class="repertoireItemGradient mainCardBorder pl-4 pr-4 mb-2"
            v-for="student in this.students">
            <v-row>
              <v-col cols="1" align-self="center">
                <v-avatar class="bg-darkBlue"
                  ><v-img :src="student.picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="3" align-self="center">
                <v-card-title class="pb-0 font-weight-bold">
                  {{ student.name }}
                </v-card-title>
                <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
                  {{ student.classification }}
                </v-card-subtitle>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn
                  elevation="0"
                  size="small"
                  rounded="pill"
                  width="85"
                  class="buttonWhite text-mediumBlue font-weight-bold">
                  {{ student.type }}
                </v-btn>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn
                  elevation="0"
                  size="small"
                  rounded="pill"
                  class="buttonGradient text-white font-weight-bold">
                  {{ get12HourTimeStringFromString(student.time) }}
                </v-btn>
              </v-col>
              <v-col cols="4" align-self="center" class="text-right">
                <v-btn
                  @click="critiqueEditDialog = true"
                  elevation="0"
                  size="small"
                  rounded="pill"
                  class="buttonWhite text-mediumBlue font-weight-bold">
                  Add Your Critique
                </v-btn>
                <v-dialog
                  v-model="critiqueEditDialog"
                  persistent
                  max-width="1000px">
                  <CritiqueFacultyComponent
                    :currentStudent="student"
                    :currentEvent="this.currentEvent"
                    @closeCritiqueEditDialogEvent="
                      closeCritiqueEditDialog
                    "></CritiqueFacultyComponent>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import CritiqueFacultyComponent from "./CritiqueFacultyComponent.vue";
  import StudentsDataService from "../../services/students.js";
  import StudentInstrumentDataService from "../../services/studentinstruments.js";
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "CritiqueListComponent",
    components: {
      CritiqueFacultyComponent,
    },
    data() {
      return {
        critiqueEditDialog: false,
        slotsCount: [],
        students: [],
      };
    },
    props: {
      currentEvent: {},
    },
    async mounted() {
      await this.getStudents();
    },
    computed: {
      ...mapStores(useEventsStore),
    },
    mixins: [DateTimeMixin],
    methods: {
      async getStudents() {
        for (let i = 0; i < this.currentEvent.signups.length; i++) {
          var tempstudent = {
            name: "",
            classification: "",
            time: this.currentEvent.signups[i].timeslot,
            signUp: this.currentEvent.signups[i],
            type: "",
            picture: "",
            email: "",
            id: this.currentEvent.signups[i].studentId,
          };
          await StudentsDataService.getStudentById(
            this.currentEvent.signups[i].studentId
          ).then((response) => {
            tempstudent.classification =
              response.data.Students[0].classification;
            tempstudent.picture = response.data.Students[0].user.picture;
            tempstudent.name =
              response.data.Students[0].user.fName +
              " " +
              response.data.Students[0].user.lName;
            tempstudent.email = response.data.Students[0].user.email;
          });
          await StudentInstrumentDataService.getStudentId(tempstudent.id).then(
            (response) => {
              tempstudent.type =
                response.data.StudentInstruments[0].instrument.name;
            }
          );
          this.students.push(tempstudent);
        }
      },
      closeCritiqueDialog() {
        this.$emit("closeCritiqueDialogEvent", false);
      },
      closeCritiqueEditDialog(val) {
        this.critiqueEditDialog = val;
      },
      /* This returns time slots in x intervals between two times */
      getTimeSlots(startDate, endDate, interval, place) {
        var slots = [];
        var isMade = true;
        if (this.slotsCount.length < place + 1) {
          this.slotsCount.push(0);
          isMade = false;
        }

        var intervalMillis = interval * 60 * 1000;

        while (startDate < endDate) {
          var mins = (startDate.getMinutes() + "0").slice(0, 2);
          slots.push(startDate.getHours() + ":" + mins);
          startDate.setTime(startDate.getTime() + intervalMillis);
          if (!isMade) {
            this.slotsCount[place]++;
          }
        }
        return slots;
      },
    },
  };
</script>

<style>
  .v-card-subtitle {
    opacity: 100%;
  }
</style>
