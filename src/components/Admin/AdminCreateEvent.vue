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
    <v-card-text class="text-center">
      <v-text-field label="Event Name" v-model="this.eventName"></v-text-field>
      <v-text-field label="Date" type="date" v-model="this.date"></v-text-field>
      <v-row>
        <v-col>
          <v-text-field
            label="Start Time"
            type="time"
            v-model="this.baseTimeStart"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="End Time"
            type="time"
            v-model="this.baseTimeEnd"></v-text-field>
        </v-col>
      </v-row>

      <v-row v-for="timeSlot in this.timeSlots">
        <v-col>
          <v-text-field
            label="Start Time"
            type="time"
            v-model="timeSlot.timeStart"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="End Time"
            type="time"
            v-model="timeSlot.timeEnd"></v-text-field>
        </v-col>
      </v-row>
      <v-btn flat @click="addTimeSlots()">Add Time Slot</v-btn>

      <v-text-field label="Interval" v-model="this.interval"></v-text-field>
    </v-card-text>
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
  export default {
    data() {
      return {
        eventName: "",
        date: "",
        interval: "",
        baseTimeStart: "",
        baseTimeEnd: "",
        timeSlots: [],
      };
    },
    methods: {
      closeSaveCreateEventDialog() {
        console.log(
          "EventName: " +
            this.eventName +
            " Date: " +
            this.date +
            " Interval: " +
            this.interval
        );
        this.$emit("closeCreateEventDialogEvent");
      },
      closeCreateEventDialog() {
        this.$emit("closeCreateEventDialogEvent");
      },
      addTimeSlots() {
        this.timeSlots.push({ timeStart: "", timeEnd: "" });
      },
    },
  };
</script>
