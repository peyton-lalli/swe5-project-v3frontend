<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Create Event</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeCreateEventDialog()">
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
    <v-card-subtitle class="text-left">
      Event Name
      <v-text-field v-model="this.eventName" class="mb-3"></v-text-field>
      Event Type
      <v-select
        class="lighterBlur font-weight-semi-bold text-darkBlue mb-3"
        v-model="type"
        :items="this.types"
        return-object>
      </v-select>
      Date
      <v-text-field type="date" v-model="this.date" class="mb-3"></v-text-field>
      <v-row v-for="timeSlot in this.timeSlots" class="mb-3">
        <v-col>
          Start Time
          <v-text-field type="time" v-model="timeSlot.starttime"></v-text-field>
        </v-col>
        <v-col>
          End Time
          <v-text-field type="time" v-model="timeSlot.endtime"></v-text-field>
        </v-col>
      </v-row>
      <v-card-text class="text-center">
        <v-btn class="buttonGradient text-white mb-3" @click="addTimeSlots()">
          Add Time Slot
        </v-btn>
      </v-card-text>
      Interval
      <v-text-field v-model="this.interval" class="mb-3"></v-text-field>
    </v-card-subtitle>
    <v-card-text class="text-center">
      <v-btn
        rounded="pill"
        class="buttonGradient text-white mr-3"
        @click="closeSaveCreateEventDialog()">
        Save
      </v-btn>
      <v-btn
        rounded="pill"
        color="#DA9B9B"
        class="text-white mr-3"
        @click="closeCreateEventDialog()">
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    data() {
      return {
        eventName: "",
        date: "",
        interval: "",
        timeSlots: [
          {
            starttime: "",
            endtime: "",
          },
        ],
        types: ["Vocal", "Instrumental"],
        type: "",
      };
    },
    methods: {
      async closeSaveCreateEventDialog() {
        let eventData = {
          title: this.eventName,
          type: this.type,
          date: this.date,
        };
        let eventTimes = new Array();
        for (let time of this.timeSlots) {
          eventTimes.push({
            starttime: time.starttime,
            endtime: time.endtime,
            interval: this.interval,
            eventId: "",
          });
        }
        await this.eventsStore.createNewEvent(eventData, eventTimes);
        this.$emit("closeCreateEventDialogEvent");
      },
      closeCreateEventDialog() {
        this.$emit("closeCreateEventDialogEvent");
      },
      addTimeSlots() {
        this.timeSlots.push({ starttime: "", endtime: "" });
      },
    },
    computed: {
      ...mapStores(useEventsStore),
    },
  };
</script>
