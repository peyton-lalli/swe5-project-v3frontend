import { defineStore } from "pinia";
import EventTimeDataService from "../services/eventtime.js";

export const useEventsStore = defineStore("events", {
  state: () => ({ eventsPageShown: false, events: [], currentSignups: [] }),
  persist: true,
  getters: {
    getEventsPageStatus(state) {
      return state.eventsPageShown;
    },
    getEventForId: (state) => {
      return (eventId) => state.events.find((event) => event.id === eventId);
    },
  },
  actions: {
    async setEvents(eventsList) {
      let formattedEvents = [];

      for (let i = 0; i < eventsList.length; i++) {
        let parsed = {
          id: eventsList[i].id,
          type: eventsList[i].type,
          date: new Date(eventsList[i].date),
          times: await this.createTimes(eventsList[i]),
        };
        console.log("PARSED ID " + parsed.id);
        formattedEvents.push(parsed);
      }
      this.events = formattedEvents;
    },
    async createTimes(event) {
      let timesFinal = [];
      await EventTimeDataService.getEventId(event.id)
        .then((response) => {
          let timesResponse = response.data.EventTime;

          for (let i = 0; i < timesResponse.length; i++) {
            let timesSingle = {};

            timesSingle.startTime = new Date(
              event.date + " " + timesResponse[i].starttime
            );

            timesSingle.endTime = new Date(
              event.date + " " + timesResponse[i].endtime
            );

            timesSingle.interval = timesResponse[i].interval;

            timesFinal.push(timesSingle);
          }
        })
        .catch((e) => {
          console.log(e);
        });

      return timesFinal;
    },
    showEventsPage() {
      this.eventsPageShown = true;
    },
    hideEventsPage() {
      this.eventsPageShown = false;
    },
    findEventForId(id) {
      let event = this.events.find((ev) => ev.id === id);
      if (!event) {
        console.log("No Event Found");
        return null;
      } else {
        return event;
      }
    },
  },
});
