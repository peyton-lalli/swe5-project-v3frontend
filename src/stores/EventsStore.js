import { defineStore } from "pinia";
import EventTimeDataService from "../services/eventtime.js";
import EventDataService from "../services/event.js";
import EventSignUpDataService from "../services/eventsignup.js";
import EventSongsDataService from "../services/eventsongs.js";
import PiecesDataService from "../services/pieces.js";
import ComposersDataService from "../services/composers.js";
import { useUserStore } from "../stores/UserStore.js";

export const useEventsStore = defineStore("events", {
  state: () => ({ events: [] }),
  persist: true,
  getters: {
    getEventForId: (state) => {
      return (eventId) => state.events.find((event) => event.id === eventId);
    },
  },
  actions: {
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
            .then(async (response) => {
              let songs = response.data.EventSongs;

              for (let [k, song] of songs.entries()) {
                songs[k] = {
                  ...songs[k],
                  ...(await this.generateSongDataForEventSong(song.pieceId)),
                };
              }

              this.events[i].signups[j] = {
                ...this.events[i].signups[j],
                ...{ songs: songs },
              };
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },

    // Given an EventSong's pieceId, gets the Piece and Composer data for it
    async generateSongDataForEventSong(id) {
      let data = {};
      await PiecesDataService.getId(id)
        .then((response) => {
          response.data.Pieces[0].pieceId = response.data.Pieces[0].id;
          delete response.data.Pieces[0].id;
          data = {
            ...this.data,
            // This might be an issue, as it would have two 'id' fields - may need to change to mimmick composer below
            // @ethanimooney: fix?
            ...response.data.Pieces[0],
          };
        })
        .catch((e) => {
          console.log(e);
        });

      // Load composer data in for each piece in the student's repertoire
      await ComposersDataService.getAll()
        .then((response) => {
          data = {
            ...data,
            ...{
              composer: response.data.Composers.filter(
                (c) => c.id === data.composerId
              )[0],
            },
          };
        })
        .catch((e) => {
          console.log(e);
        });

      return data;
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
        // We need to add support for faculty and admin once we update the database design
        // TODO @ethanimooney: add this
        if (userStore.userInfo.roles.default.roleId === 1) {
          eventSignups = eventSignups.concat(
            event.signups.filter(
              (s) => s.studentId === userStore.userRoleInfo.studentId
            )
          );
        }
      }

      return eventSignups;
    },
    // Return true if the user is signed up for the event coorespinding to the eventId passed in
    hasUserSignedUpForEvent(eventId) {
      let userStore = useUserStore();
      let pastSignup = this.events
        .filter((e) => e.id === eventId)[0]
        .signups.filter(
          (s) => (s.studentId = userStore.userRoleInfo.studentId)
        );
      if (pastSignup.length != 0) {
        return pastSignup[0];
      } else {
        return {};
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
      let songData = {};
      let signupId = 0;

      // Post the change to the database
      await EventSignUpDataService.create(data)
        .then(async (response) => {
          signupId = response.data.id;
          await EventSongsDataService.create({
            pieceId: piece.pieceId,
            eventsignupId: response.data.id,
          })
            .then(async (sResponse) => {
              // Build the song data to be loaded in the local copy
              let sId = sResponse.data.id;
              songData = {
                ...sResponse.data,
                ...piece,
              };
              songData.id = sId;
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });

      // Update the EventsStore.events with the new data
      this.events[
        this.events.findIndex((e) => e.id === data.eventId)
      ].signups.push({
        ...data,
        ...{ songs: new Array(songData), ...{ id: signupId } },
      });
    },
    // Generate a signup for an event based on the passed in signup
    async updateSignupForEvent(data, piece) {
      let songData = {};

      // Post the change to the database
      await EventSignUpDataService.update(data.id, data)
        .then(async (response) => {
          await EventSongsDataService.update(piece.pieceId, {
            pieceId: piece.pieceId,
            eventsignupId: data.id,
          })
            .then(async (sResponse) => {
              // Build the song data to be loaded in the local copy
              songData = {
                ...sResponse.data,
                ...piece,
              };
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });

      // Update the EventsStore.events with the new data

      let index = this.events.findIndex((e) => e.id === data.eventId);
      let signupIndex = this.events[index].signups.findIndex(
        (s) => s.id === data.id
      );
      this.events[index].signups[signupIndex] = {
        ...data,
        ...{ songs: new Array(songData) },
      };
    },

    async createNewEvent(eventData, timeData) {
      // Post the change to the database
      let finalTimeData = [];
      await EventDataService.create(eventData)
        .then(async (response) => {
          for (let time of timeData) {
            time.eventId = response.data.id;
            await EventTimeDataService.create(time)
              .then(async (response) => {
                finalTimeData.push(response.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });

      // Update the EventsStore.events with the new data
      this.events.push({ ...eventData, ...{ times: finalTimeData } });
    },
  },
});
