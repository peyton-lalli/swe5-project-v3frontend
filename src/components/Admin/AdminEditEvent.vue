<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Edit Event</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditEventDialog()">
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
        <v-btn
          class="buttonGradient text-white mb-3 ml-2"
          @click="removeTimeSlots()">
          Remove Time Slot
        </v-btn>
      </v-card-text>
      Interval
      <v-text-field v-model="this.interval" class="mb-3"></v-text-field>
    </v-card-subtitle>
    <v-card-text class="text-center">
      <v-btn
        rounded="pill"
        class="buttonGradient text-white mr-3"
        @click="closeSaveEditEventDialog()">
        Save
      </v-btn>
      <v-btn
        rounded="pill"
        color="#DA9B9B"
        class="text-white mr-3"
        @click="closeEditEventDialog()">
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    data() {
      return {
        eventName: "",
        date: "",
        interval: "",
        timeSlots: [],
      };
    },
    mixins: [DateTimeMixin],
    created() {
      console.log(this.eventData);
      this.setAllItems();
    },
    props: {
      eventData: {},
    },
    methods: {
      setAllItems() {
        this.eventName = this.eventData.type;
        this.date = this.parseDate();
        this.interval = this.eventData.times[0].interval;
        for (let timeSlot of this.eventData.times) {
          console.log(timeSlot.startTime);
          console.log(this.parseTime(timeSlot.startTime));
          this.timeSlots.push({
            starttime: this.parseTime(timeSlot.startTime),
            endtime: this.parseTime(timeSlot.endTime),
          });
        }
      },
      async closeSaveEditEventDialog() {
        let eventData = {
          type: this.eventName,
          date: this.date,
          updatedAt: new Date(),
        };
        await this.eventsStore.updateEvent(eventData, this.eventData.eventId);

        if (this.eventData.times.length === this.timeSlots.length) {
          for (let [i, time] of this.timeSlots.entries()) {
            let eventTime = {};
            eventTime = {
              starttime: time.starttime,
              endtime: time.endtime,
              interval: this.interval,
              updatedAt: new Date(),
            };
            console.log(eventTime);
            await this.eventsStore.updateTime(
              eventTime,
              this.eventData.times[i].eventtimeId
            );
          }
        } else if (this.eventData.times.length > this.timeSlots.length) {
          for (let [i, time] of this.timeSlots.entries()) {
            let eventTime = {};
            eventTime = {
              starttime: time.starttime,
              endtime: time.endtime,
              interval: this.interval,
              updatedAt: new Date(),
            };
            console.log(eventTime);
            await this.eventsStore.updateTime(
              eventTime,
              this.eventData.times[i].eventtimeId
            );
          }
          for (let [i, time] of this.eventData.times.entries()) {
            if (i >= this.timeSlots.length) {
              await this.eventsStore.removeTime(
                this.eventData.times[i].eventtimeId
              );
            }
          }
        } else if (this.eventData.times.length < this.timeSlots.length) {
          for (let [i, time] of this.timeSlots.entries()) {
            console.log(
              "this.eventData.times.length: " +
                this.eventData.times.length +
                ", i:" +
                i
            );
            if (i < this.eventData.times.length) {
              let eventTime = {};
              eventTime = {
                starttime: time.starttime,
                endtime: time.endtime,
                interval: this.interval,
                updatedAt: new Date(),
              };
              await this.eventsStore.updateTime(
                eventTime,
                this.eventData.times[i].eventtimeId
              );
            } else {
              if (time.starttime !== "" || time.endtime !== "") {
                console.log("Event Id: " + this.eventData.eventId);
                let eventTime = {
                  starttime: time.starttime,
                  endtime: time.endtime,
                  interval: this.interval,
                  eventId: this.eventData.eventId,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                };
                await this.eventsStore.addTime(eventTime);
              }
            }
          }
        }

        this.$emit("closeEditEventDialogEvent");
      },
      parseDate() {
        const date = new Date(this.eventData.date);
        return date.toISOString().slice(0, 10);
      },
      parseTime(time) {
        const t = new Date(time);
        t.setHours(t.getHours() - t.getTimezoneOffset() / 60);
        return t.toISOString().slice(11, 16);
      },
      closeEditEventDialog() {
        this.$emit("closeEditEventDialogEvent");
      },
      addTimeSlots() {
        this.timeSlots.push({ starttime: "", endtime: "" });
      },
      removeTimeSlots() {
        this.timeSlots.pop();
      },
    },
    computed: {
      ...mapStores(useEventsStore),
    },
  };
</script>
