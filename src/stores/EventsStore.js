import { defineStore } from "pinia";
import EventTimeDataService from "../services/eventtime.js";
import EventDataService from "../services/event.js";
import EventSignUpDataService from "../services/eventsignup.js";
import EventSongsDataService from "../services/eventsongs.js";
import AvailabilityDataService from "../services/availability.js";
import { useUserStore } from "../stores/UserStore.js";
import { DateTimeMixin } from "../mixins/DateTimeMixin.js";

export const useEventsStore = defineStore("events", {
  state: () => ({ events: [] }),
  persist: true,
  getters: {
    getEventForId: (state) => {
      return (eventId) => state.events.find((event) => event.id === eventId);
    },
  },
  mixins: [DateTimeMixin],
  actions: {
    // Load all events and relevant data in from database
    async setEvents() {
      await EventDataService.getAllEventsWithInfo()
        .then((response) => {
          console.log(response);
          this.events = response.data;

          this.createTimesAndDates();

          for (let [i, event] of this.events.entries()) {
            for (let [j, signup] of event.signups.entries()) {
              for (let [k, juror] of signup.jurors.entries()) {
                juror.instructor = {
                  ...juror.instructor,
                  ...juror.instructor.user,
                };
                this.events[i].signups[j].jurors[k] = {
                  ...juror,
                  ...juror.instructor,
                };
                this.events[i].signups[j].jurors[k].name =
                  this.events[i].signups[j].jurors[k].fName +
                  " " +
                  this.events[i].signups[j].jurors[k].lName;
                delete this.events[i].signups[j].jurors[k].fName;
                delete this.events[i].signups[j].jurors[k].lName;
                delete this.events[i].signups[j].jurors[k].instructor;
                delete this.events[i].signups[j].jurors[k].user;
              }
            }
          }

          for (let [i, event] of this.events.entries()) {
            for (let [j, signup] of event.signups.entries()) {
              for (let [k, critique] of signup.critiques.entries()) {
                let juror = critique.eventsignupjuror;

                juror.instructor = {
                  ...juror.instructor,
                  ...juror.instructor.user,
                };
                this.events[i].signups[j].critiques[k].eventsignupjuror = {
                  ...juror,
                  ...juror.instructor,
                };
                this.events[i].signups[j].critiques[k].eventsignupjuror.name =
                  this.events[i].signups[j].critiques[k].eventsignupjuror
                    .fName +
                  " " +
                  this.events[i].signups[j].critiques[k].eventsignupjuror.lName;
                delete this.events[i].signups[j].critiques[k].eventsignupjuror
                  .fName;
                delete this.events[i].signups[j].critiques[k].eventsignupjuror
                  .lName;
                delete this.events[i].signups[j].critiques[k].eventsignupjuror
                  .instructor;
                delete this.events[i].signups[j].critiques[k].eventsignupjuror
                  .user;
              }
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // Load all of the times for a specific event, appending the event's data
    async createTimesAndDates() {
      let timesFinal = [];
      for (let [i, event] of this.events.entries()) {
        for (let [j, time] of event.times.entries()) {
          this.events[i].times[j] = {
            startTime: new Date(event.date + " " + time.starttime),
            endTime: new Date(event.date + " " + time.endtime),
            interval: time.interval,
            eventtimeId: time.eventtimeId,
          };
        }

        event.times.sort((a, b) => a.startTime - b.startTime);

        this.events[i].timeslots = DateTimeMixin.methods.getTimeSlots(
          this.events[i].times
        );
      }

      for (let [i, event] of this.events.entries()) {
        this.events[i].date = new Date(event.date);
      }

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
    // Return true if the user is signed up for the event cooresponding to the eventId passed in
    hasUserSignedUpForEvent(eventId) {
      let userStore = useUserStore();
      let pastSignup = this.events
        .filter((e) => e.eventId === eventId)[0]
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
    async createSignupForEvent(data, selectedPieces) {
      let songData = [];
      let signupId = 0;

      // Post the change to the database
      await EventSignUpDataService.create(data)
        .then(async (response) => {
          signupId = response.data.id;
          for (let piece of selectedPieces) {
            await EventSongsDataService.create({
              pieceId: piece.pieceId,
              eventsignupId: response.data.id,
            })
              .then(async (sResponse) => {
                // Build the song data to be loaded in the local copy
                let sId = sResponse.data.id;
                let ca = sResponse.data.createdAt;
                let ua = sResponse.data.updatedAt;
                let songDataTemp = {
                  ...sResponse.data,
                  ...{ piece: piece },
                  ...{
                    eventsongId: sId,
                    eventSongCreatedAt: ca,
                    eventSongUpdatedAt: ua,
                  },
                };
                delete songDataTemp.pieceId;
                delete songDataTemp.id;
                delete songDataTemp.eventsignupId;
                delete songDataTemp.createdAt;
                delete songDataTemp.updatedAt;

                songData.push(songDataTemp);
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
      this.events[
        this.events.findIndex((e) => e.eventId === data.eventId)
      ].signups.push({
        ...data,
        ...{ songs: songData, ...{ signupId: signupId } },
      });
    },
    // Generate a signup for an event based on the passed in signup
    async updateSignupForEvent(data, eventSongs) {
      let songData = [];

      // Post the change to the database
      await EventSignUpDataService.update(data.signupId, data)
        .then(async () => {
          for (let eventSong of eventSongs) {
            await EventSongsDataService.update(eventSong.eventsongId, {
              pieceId: eventSong.piece.pieceId,
              eventsignupId: data.id,
            })
              .then(async (sResponse) => {
                // Build the song data to be loaded in the local copy
                let songDataTemp = {
                  ...sResponse.data,
                  ...eventSong,
                };
                delete songDataTemp.message;

                songData.push(songDataTemp);
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

      let index = this.events.findIndex((e) => e.eventId === data.eventId);
      let signupIndex = this.events[index].signups.findIndex(
        (s) => s.signupId === data.signupId
      );
      this.events[index].signups[signupIndex] = {
        ...data,
        ...{ songs: songData },
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
                let tempData = response.data;
                let temp = {
                  startTime: new Date(
                    eventData.date + " " + tempData.starttime
                  ),
                  endTime: new Date(eventData.date + " " + tempData.endtime),
                  eventtimeId: tempData.id,
                  interval: tempData.interval,
                };
                console.log(temp);
                finalTimeData.push(temp);
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
      console.log(this.events);
    },
    getAvailabileEventsForUser() {
      let userStore = useUserStore();

      let events = [];

      for (let event of this.events) {
        let availabilities = userStore.userRoleInfo.availabilities.filter(
          (a) => a.eventId === event.eventId
        );
        if (availabilities.length > 0) {
          event = {
            ...event,
            ...{ availabilities: availabilities },
          };
          events.push(event);
        }
      }

      return events;
    },
    async getAvailaibilityForEventByUserId(userId, eventId) {
      let list = [];
      await AvailabilityDataService.getUserAndEvent(userId, eventId)
        .then((response) => {
          list = response.data.Availability;

          for (let [i, item] of list.entries()) {
            let dateObj = item.event.eventDate;
            list[i] = {
              ...item,
              ...{ eventDate: dateObj },
            };

            delete item.event;
          }
        })
        .catch((e) => {
          console.log(e);
        });

      return list;
    },
    async updateEvent(eventData, eventId) {
      await EventDataService.update(eventId, eventData).catch((e) => {
        console.log(e);
      });
    },
    async updateTime(timeData, timeId) {
      await EventTimeDataService.update(timeId, timeData).catch((e) => {
        console.log(e);
      });
    },
    async removeTime(timeId) {
      await EventTimeDataService.delete(timeId).catch((e) => {
        console.log(e);
      });
    },
    async addTime(timeData) {
      await EventTimeDataService.create(timeData).catch((e) => {
        console.log(e);
      });
    },
  },
});
