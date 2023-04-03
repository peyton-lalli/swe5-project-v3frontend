<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">
          {{ this.currentEvent.title }} Critique</v-col
        >
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeCritiqueDialog()">
            <v-icon>
              <font-awesome-icon
                icon="a-solid fa-circle-xmark"
                class="text-lightBlue"
              >
              </font-awesome-icon>
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-row>
      <v-col>
        <v-card-subtitle class="font-weight-bold text-darkBlue">
          {{ this.currentEvent.date }}
        </v-card-subtitle>
        <v-card-subtitle
          class="font-weight-bold text-darkBlue"
          v-for="time in this.currentEvent.times"
        >
          {{ getTime(time.startTime) }} - {{ getTime(time.endTime) }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-bold text-darkBlue">
          {{ place }}
        </v-card-subtitle>
      </v-col>
      <v-col>
        <v-card-subtitle class="font-weight-bold text-darkGray pl-1">
          0/{{ slotsCount[0] + slotsCount[1] }} Timeslots Filled
        </v-card-subtitle>
        <v-row class="pt-3">
          <v-card-text
            v-for="(time, index) in getTimeSlots(
              getDates(this.currentEvent.times[0].startTime),
              getDates(this.currentEvent.times[0].endTime),
              this.currentEvent.times[0].interval,
              0
            )"
            :key="index"
          >
            <v-btn
              elevation="0"
              rounded="lg"
              size="x-small"
              class="buttonGradient text-white font-weight-bold"
              >{{ time }}</v-btn
            >
          </v-card-text>
        </v-row>
        <v-row>
          <v-card-text
            v-for="(time, index) in getTimeSlots(
              getDates(this.currentEvent.times[1].startTime),
              getDates(this.currentEvent.times[1].endTime),
              this.currentEvent.times[1].interval,
              1
            )"
            :key="index"
          >
            <v-btn
              elevation="0"
              rounded="lg"
              size="x-small"
              class="buttonGradient text-white font-weight-bold"
              >{{ time }}</v-btn
            >
          </v-card-text>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-card-title class="font-weight-bold text-darkGray ml-3">
        Students Attending
      </v-card-title>
    </v-row>
    <v-row>
      <v-card-text>
        <v-card
          class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2"
          v-for="student in this.students"
        >
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
                class="buttonWhite text-mediumBlue font-weight-bold"
              >
                {{ student.type }}
              </v-btn>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold"
              >
                {{ student.time }}
              </v-btn>
            </v-col>
            <v-col cols="4" align-self="center" class="text-right">
              <v-dialog v-model="critiqueEditDialog" max-width="1000px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="critiqueEditDialog = true"
                    elevation="0"
                    size="small"
                    rounded="pill"
                    class="buttonWhite text-mediumBlue font-weight-bold"
                  >
                    Add Your Critique
                  </v-btn>
                </template>
                <CritiqueFacultyComponent
                  @closeCritiqueEditDialogEvent="closeCritiqueEditDialog"
                ></CritiqueFacultyComponent>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
import CritiqueFacultyComponent from "./CritiqueFacultyComponent.vue";
import studentinfo from "../../services/studentinfo.js";
import users from "../../services/users.js";
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
      place: "Adams Recital Hall",
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
  methods: {
    async getStudents() {
      for (let i = 0; i < this.currentEvent.signups.length; i++) {
        var userId = 0;
        var tempstudent = {
          name: "",
          classification: "",
          time: this.currentEvent.signups[i].timeslot,
          type: "TEMP",
          picture: "",
        };
        await studentinfo
          .getUserId(this.currentEvent.signups[i].studentinfoId)
          .then((response) => {
            userId = response.data.StudentInfo[i].userId;
            tempstudent.classification =
              response.data.StudentInfo[i].classification;
          });
        await users.getSingle(userId).then((response) => {
          tempstudent.picture = response.data.Users[i].picture;
          tempstudent.name =
            response.data.Users[i].fName + " " + response.data.Users[i].lName;
          this.students.push(tempstudent);
        });
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
      console.log("Place " + place + ": " + this.slotsCount[place]);
      return slots;
    },
    /* This takes a date and time string and changes to a Date */
    getDates(dateTime) {
      var dateTimeParse = [];
      var firstpart = dateTime.split("T");
      var secondpart = firstpart[1].split(".");
      dateTimeParse = firstpart[0] + " " + secondpart[0];
      return new Date(dateTimeParse);
    },
    getTime(dateTime) {
      var dateTimeParse = [];
      dateTimeParse = dateTime.split("T");
      dateTimeParse = dateTimeParse[1].split(".");
      return dateTimeParse[0];
    },
  },
};
</script>

<style></style>
