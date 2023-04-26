<template>
  <v-container fluid>
    <v-card class="rounded-lg mainBlur">
      <v-card-title class="font-weight-bold text-darkBlue ml-4 mt-4">
        <v-row>
          <v-col class="text-h5 font-weight-bold pb-0 mb-2">
            {{ eventData.title }} Availability</v-col
          >
        </v-row>
      </v-card-title>
      <v-card-subtitle class="font-weight-bold text-mediumBlue pt-0 ml-4">
        {{ formatDate(eventData.date) }}
      </v-card-subtitle>
      <v-card-subtitle class="font-weight-bold text-mediumBlue ml-4">
        {{ timesInfoString }}
      </v-card-subtitle>
      <v-card-text class="pb-0">
        <v-container>
          <v-row>
            <v-col>
              <v-row
                v-if="!addNewAvailability"
                class="py-0 font-weight-bold text-darkBlue">
                <v-col cols="5" class="py-0"> Start Time </v-col>
                <v-col cols="5" class="py-0"> End Time </v-col>
              </v-row>
              <v-row v-for="(availability, index) in availabilities">
                <v-col cols="5">
                  <v-text-field
                    readonly
                    placeholder="Start Time"
                    v-model="availability.starttime"></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    readonly
                    placeholder="Start Time"
                    v-model="availability.endtime"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    rounded="lg"
                    class="mr-3 mainBlur buttonCancel text-none font-weight-bold"
                    @click="removeAvailabilitySlot(index)">
                    Delete
                  </v-btn>
                </v-col>
              </v-row>
              <!-- New -->
              <v-row
                v-if="addNewAvailability"
                class="py-0 font-weight-bold text-darkBlue">
                <v-col cols="4" class="py-0"> Start Time </v-col>
                <v-col cols="4" class="py-0"> End Time </v-col>
              </v-row>
              <v-row v-if="addNewAvailability">
                <v-col cols="4">
                  <v-select
                    :items="timeslots"
                    placeholder="Start Time"
                    item-title="time"
                    item-value="time"
                    v-model="newAvailability.starttime"></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :items="timeslots"
                    placeholder="End Time"
                    item-title="time"
                    item-value="time"
                    v-model="newAvailability.endtime"></v-select>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    rounded="lg"
                    class="mr-3 mainBlur buttonCancel text-none font-weight-bold"
                    @click="cancelAddNewAvailabilitySlot()">
                    Cancel
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    rounded="lg"
                    class="mr-3 mainBlur buttonGradient text-white text-none font-weight-bold"
                    @click="saveNewAvailabilitySlot()">
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                rounded="lg"
                class="mainBlur buttonGradient text-white text-none font-weight-bold"
                block
                @click="addAvailabilitySlot()"
                >Add Time</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="mr-2 mb-2 pt-4 pr-2">
        <v-btn
          rounded="lg"
          elevation="0"
          class="text-none buttonCancel ml-auto mr-3 text-white font-weight-bold"
          @click="closeDialog()">
          Cancel
        </v-btn>
        <v-btn
          rounded="lg"
          elevation="0"
          class="text-none buttonGradient text-white font-weight-bold"
          @click="createOrEditAvailabilities()">
          {{ isEdit ? "Save Availabilities" : "Add Availabilities" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";

  export default {
    name: "EventAvailabilityDialogBody",
    components: {},
    data() {
      return {
        eventData: JSON.parse(JSON.stringify(this.sentEventData)),
        isEdit: this.sentBool,
        timeslots: JSON.parse(JSON.stringify(this.sentEventData)).timeslots,
        timesInfoString: JSON.parse(JSON.stringify(this.sentEventData))
          .timesInfoString,
        availabilities: JSON.parse(JSON.stringify(this.sentAvailabilityData)),
        newAvailabilities: [],
        newAvailability: {},
        removedAvailabilities: [],
        addNewAvailability: false,
      };
    },
    mixins: [DateTimeMixin],
    props: {
      sentEventData: {},
      sentAvailabilityData: {
        type: [Array],
        default() {
          return [];
        },
      },
      sentBool: false,
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    watch: {
      sentBool(newBool) {
        this.isEdit = newBool;
        if (!this.isEdit) {
          this.addAvailabilitySlot();
        }
      },
      sentEventData(data) {
        this.eventData = JSON.parse(JSON.stringify(data));

        this.combineTimeslots();

        this.timesInfoString = this.eventData.timesInfoString;
      },
      sentAvailabilityData(data) {
        this.availabilities = data;
        this.editedAvailabilities = this.availabilities;
      },
    },
    async mounted() {
      this.combineTimeslots();

      if (!this.isEdit) {
        this.addAvailabilitySlot();
      }
    },
    methods: {
      async createOrEditAvailabilities() {
        if (!this.isEdit) {
          await this.userStore.createAvailabilitiesForEvent(
            this.availabilities
          );
        } else {
          await this.userStore.updateAvailabilitiesForEvent(
            this.newAvailabilities,
            this.removedAvailabilities
          );
        }
        this.closeDialog();
        this.$emit("regenerateAvailabilties");
      },
      combineTimeslots() {
        let combinedTimeslots = [];
        for (let timeslotGroup of this.eventData.timeslots) {
          combinedTimeslots = combinedTimeslots.concat(timeslotGroup);
        }

        this.timeslots = combinedTimeslots;
      },
      closeDialog() {
        this.$emit("closeEventDialogEvent");
      },
      addAvailabilitySlot() {
        if (this.addNewAvailability) {
          alert("Already adding new availability");
        } else {
          this.newAvailability = {
            starttime: "--:--:--",
            endtime: "--:--:--",
            eventId: this.eventData.eventId,
          };
          this.addNewAvailability = true;
        }
      },
      removeAvailabilitySlot(index) {
        this.removedAvailabilities.push(this.availabilities[index]);
        this.availabilities.splice(index, 1);
      },
      saveNewAvailabilitySlot() {
        if (this.newAvailability.starttime === "--:--:--") {
          alert("Please Select an Availability Start Time");
        } else {
          if (this.newAvailability.endtime === "--:--:--") {
            alert("Please Select an Availability End Time");
          } else {
            let date = this.eventData.date.split("T", 1);
            let start = new Date(date + " " + this.newAvailability.starttime);
            let end = new Date(date + " " + this.newAvailability.endtime);

            if (start.getTime() > end.getTime()) {
              alert("Availability start cannot be after availaiblity end.");
            } else if (end.getTime() === start.getTime()) {
              alert(
                "Availability start and availability end cannot be the same."
              );
            } else {
              this.availabilities.push(this.newAvailability);
              this.newAvailabilities.push(this.newAvailability);
              this.newAvailability = {};
              this.addNewAvailability = false;
            }
          }
        }
      },
      cancelAddNewAvailabilitySlot() {
        this.newAvailability = {};
        this.addNewAvailability = false;
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-text-field {
    border-radius: 100px;
  }
</style>
