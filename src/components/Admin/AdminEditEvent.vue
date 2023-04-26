<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            Edit Event
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="text-left pa-2 pt-0">
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
          class="text-none buttonGradient ml-auto text-white font-weight-bold buttonBorder"
          @click="addTimeSlots()">
          Add Time Slot
        </v-btn>
        <v-btn
          elevation="0"
          class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
          @click="removeTimeSlots()">
          Remove Time Slot
        </v-btn>
      </v-card-text>
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Interval
      </v-card-text>
      <v-text-field v-model="this.interval" class="mb-3"></v-text-field>
    </v-card-text>
    <v-card-actions class="ml-auto pa-0 pr-1">
      <v-btn
        elevation="0"
        class="text-none buttonCancel ml-auto text-white font-weight-bold buttonBorder"
        @click="closeEditEventDialog()">
        Cancel
      </v-btn>
      <v-btn
        elevation="0"
        class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
        @click="closeSaveEditEventDialog()">
        Save
      </v-btn>
    </v-card-actions>
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
        types: ["Vocal", "Instrumental"],
        type: "",
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
        this.eventName = this.eventData.title;
        this.type = this.eventData.type;
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
          title: this.eventName,
          type: this.type,
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
