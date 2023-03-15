import { defineStore } from "pinia";
import EventTimeDataService from "../services/eventtime.js";
import EventDataService from "../services/event.js";
import EventSignUpDataService from "../services/eventsignup.js";
import EventSongsDataService from "../services/eventsongs.js";
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
    // Load all events and relevant data in from database
    async setEvents() {
      this.events = [];

      // Load all the events in, creating a custom object array with the needed data.
      await EventDataService.getAll()
        .then(async (response) => {
          for (let event of response.data.Event) {
            this.events.push({
              id: event.id,
              type: event.type,
              title: event.title,
              date: new Date(event.date),
              times: await this.createTimes(event),
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
      await this.generateSignUpsForAllEvents();
    },
    // Load all of the signups for a specific event, appending the event's data
    // Probably needs to be changed to just be called inside the constructor for the event on line 34 - similar to how createTimes() works.
    async generateSignUpsForAllEvents() {
      await EventSignUpDataService.getAll()
        .then((response) => {
          for (let [i, event] of this.events.entries()) {
            this.events[i] = {
              ...this.events[i],
              ...{
                signups: response.data.EventSignUp.filter(
                  (signUp) => signUp.eventId === event.id
                ),
              },
            };
          }
        })
        .catch((e) => {
          console.log(e);
        });

      // Loads the songs for each signup of each event
      for (let [i, event] of this.events.entries()) {
        for (let [j, signup] of event.signups.entries()) {
          await EventSongsDataService.getEventSignupId(signup.id)
            .then((response) => {
              this.events[i].signups[j] = {
                ...this.events[i].signups[j],
                ...{ songs: response.data.EventSongs },
              };
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }

      console.log(this.events);
    },
    // Load all of the times for a specific event, appending the event's data
    async createTimes(event) {
      let timesFinal = [];
      await EventTimeDataService.getEventId(event.id)
        .then((response) => {
          for (let time of response.data.EventTime) {
            timesFinal.push({
              startTime: new Date(event.date + " " + time.starttime),
              endTime: new Date(event.date + " " + time.endtime),
              interval: time.interval,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });

      return timesFinal;
    },
    // Clear all events
    clearEvents() {
      this.events = new Array();
    },
    // Return a list of all of the signups of events for the current user in the UserStore
    generateEventSignupsForUser() {
      let userStore = useUserStore();

      let eventSignups = new Array();

      for (let event of this.events) {
        eventSignups = eventSignups.concat(
          event.signups.filter(
            (s) => s.studentinfoId === userStore.userRoleInfo.id
          )
        );
      }

      return eventSignups;
    },
    // Return true if the user is signed up for the event coorespinding to the eventId passed in
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
    // Return and event object from this.events for the passed in id
    findEventForId(id) {
      let event = this.events.find((ev) => ev.id === id);
      if (!event) {
        console.log("No Event Found");
        return null;
      } else {
        return event;
      }
    },
    // Generate a signup for an event based on the passed in signup
    async createSignupForEvent(data, piece) {
      this.events[
        this.events.findIndex((e) => e.id === data.eventId)
      ].signups.push(data);

      let signupId = 0;

      await EventSignUpDataService.create(data)
        .then((response) => {
          console.log(response);
          signupId = response.data.id;
        })
        .catch((e) => {
          console.log(e);
        });

      let songData = {
        pieceId: piece.id,
        eventsignupId: signupId,
      };

      await EventSongsDataService.create(songData).catch((e) => {
        console.log(e);
      });
    },
  },
});
