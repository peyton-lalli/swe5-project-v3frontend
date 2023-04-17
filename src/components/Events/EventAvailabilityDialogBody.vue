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
              <v-row v-for="(availability, index) in availabilities">
                <v-col cols="5">
                  <v-text-field
                    readonly
                    type="time"
                    placeholder="Start Time"
                    v-model="availability.starttime"></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    readonly
                    type="time"
                    placeholder="End Time"
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
              <v-row v-if="addNewAvailability">
                <v-col cols="4">
                  <v-text-field
                    type="time"
                    placeholder="Start Time"
                    v-model="newAvailability.starttime"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="time"
                    placeholder="End Time"
                    v-model="newAvailability.endtime"></v-text-field>
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
      sentAvailabilityData: [],
      sentBool: false,
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    watch: {
      sentBool(newBool) {
        this.isEdit = newBool;
      },
      sentEventData(data) {
        this.eventData = JSON.parse(JSON.stringify(data));
        this.timeslots = this.eventData.timeslots;
        this.timesInfoString = this.eventData.timesInfoString;
      },
      sentAvailabilityData(data) {
        this.availabilities = data;
        this.editedAvailabilities = this.availabilities;
      },
    },
    async mounted() {
      if (!this.isEdit) {
        this.addAvailabilitySlot();
      }
    },
    methods: {
      createOrEditAvailabilities() {
        if (!this.isEdit) {
          this.userStore.createAvailabilitiesForEvent(this.availabilities);
        } else {
          this.userStore.updateAvailabilitiesForEvent(
            this.newAvailabilities,
            this.removedAvailabilities
          );
        }
        this.closeDialog();
      },
      closeDialog() {
        this.$emit("closeEventDialogEvent");
      },
      addAvailabilitySlot() {
        if (this.addNewAvailability) {
          alert("Already adding new availability");
        } else {
          this.newAvailability = {
            starttime: "",
            endtime: "",
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
        this.availabilities.push(this.newAvailability);
        this.newAvailabilities.push(this.newAvailability);
        this.newAvailability = {};
        this.addNewAvailability = false;
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
