import { defineStore } from "pinia";
import EventTimeDataService from "../services/eventtime.js";
import EventDataService from "../services/event.js";
import EventSignUpDataService from "../services/eventsignup.js";
import { useUserStore } from "../stores/UserStore.js";

export const useEventsStore = defineStore("events", {
  state: () => ({ eventsPageShown: false, events: [] }),
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
    showEventsPage() {
      this.eventsPageShown = true;
    },
    hideEventsPage() {
      this.eventsPageShown = false;
    },
    async setEvents() {
      this.events = [];

      await EventDataService.getAll()
        .then(async (response) => {
          let eventsResponse = response.data.Event;
          for (let event in eventsResponse) {
            console.log(event);
            this.events.push({
              id: eventsResponse[event].id,
              type: eventsResponse[event].type,
              title: eventsResponse[event].title,
              date: new Date(eventsResponse[event].date),
              times: await this.createTimes(eventsResponse[event]),
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });

      console.log("AFTER ORIGINAL EVENTS GET");
      console.log(this.events);

      await this.generateSignUpsForAllEvents();

      console.log("AFTER ORIGINAL EVENTS SIGNUPS GET");
      console.log(this.events);
    },
    async generateSignUpsForAllEvents() {
      await EventSignUpDataService.getAll()
        .then((response) => {
          for (let event in this.events) {
            let updateEventId = this.events.findIndex(
              (e) => e.id === this.events[event].id
            );

            this.events[updateEventId] = {
              ...this.events[updateEventId],
              ...{
                signups: response.data.EventSignUp.filter(
                  (signUp) => signUp.eventId === this.events[event].id
                ),
              },
            };
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
    clearEvents() {
      this.events = new Array();
    },
    generateEventSignupsForUser() {
      let userStore = useUserStore();

      let eventSignups = new Array();

      for (let event in this.events) {
        eventSignups = eventSignups.concat(
          this.events[event].signups.filter(
            (s) => s.studentinfoId === userStore.userRoleInfo.id
          )
        );
      }
      return eventSignups;
    },
    hasUserSignedUpForEvent(eventId) {
      let userStore = useUserStore();
      let pastSignups = this.events
        .filter((e) => e.id === eventId)[0]
        .signups.filter((s) => (s.studentinfoId = userStore.userRoleInfo.id));

      if (pastSignups.length != 0) {
        return true;
      } else {
        return false;
      }
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
    async createSignupForEvent(data) {
      // this.events[
      //   this.events.findIndex((e) => (e.id = data.eventId))
      // ].signups.push(data);

      await EventSignUpDataService.create(data).catch((e) => {
        console.log(e);
      });

      await this.setEvents();
    },
  },
});
