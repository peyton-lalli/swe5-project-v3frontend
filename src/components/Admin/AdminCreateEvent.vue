<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-4">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-square-pen"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2"
            >Create Event</v-card-title
          >
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-subtitle class="text-left">
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
        Event Name
      </v-card-text>
      <v-text-field v-model="this.eventName" class="mb-3"></v-text-field>
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Event Type
      </v-card-text>
      <v-select class="mb-3" v-model="type" :items="this.types" return-object>
      </v-select>
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Date
      </v-card-text>
      <v-text-field type="date" v-model="this.date" class="mb-3"></v-text-field>
      <v-row v-for="timeSlot in this.timeSlots" class="mb-3">
        <v-col>
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
            Start Time
          </v-card-text>
          <v-text-field type="time" v-model="timeSlot.starttime"></v-text-field>
        </v-col>
        <v-col>
          <v-card-text
            class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
            End Time
          </v-card-text>
          <v-text-field type="time" v-model="timeSlot.endtime"></v-text-field>
        </v-col>
      </v-row>
      <v-card-text class="text-center">
        <v-btn
          elevation="0"
          class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
          @click="addTimeSlots()">
          Add Time Slot
        </v-btn>
      </v-card-text>
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Interval
      </v-card-text>
      <v-text-field
        type="number"
        v-model="this.interval"
        class="mb-3"></v-text-field>
    </v-card-subtitle>
    <v-card-actions class="ml-auto pa-0 pr-1">
      <v-btn
        elevation="0"
        class="text-none buttonCancel ml-auto text-white font-weight-bold buttonBorder"
        @click="closeCreateEventDialog()">
        Cancel
      </v-btn>
      <v-btn
        elevation="0"
        class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
        @click="closeSaveCreateEventDialog()">
        Save
      </v-btn>
    </v-card-actions>
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
