export const DateTimeMixin = {
  methods: {
    get12HourTimeString(t) {
      let hours = t.getHours();
      let suffix = hours >= 12 ? "PM" : "AM";
      hours = ((hours + 11) % 12) + 1;
      let minutes = t.getMinutes() === 0 ? "00" : t.getMinutes();
      return hours + ":" + minutes + suffix;
    },
    get12HourTimeStringFromString(t) {
      return parseInt(t.substring(0, 2)) > 12
        ? parseInt(t.substring(0, 2)) - 12 + t.substring(2, t.length - 3)
        : parseInt(t.substring(0, 2)) < 10
        ? t.substring(1, t.length - 3)
        : t.substring(0, t.length - 3);
    },
    formatDate(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("us-EN", options);
    },
    createTimesInfoString(times) {
      let timesString = "";
      for (let i = 0; i < times.length; i++) {
        timesString +=
          this.get12HourTimeString(new Date(times[i].startTime)) +
          " - " +
          this.get12HourTimeString(new Date(times[i].endTime));
        if (i + 1 < times.length) {
          timesString += " & ";
        }
      }

      return timesString;
    },
    getTimeSlots(times) {
      let counter = 1;
      let totalSlots = [];

      for (let time of times) {
        let slots = [];
        let intervalMillis = time.interval * 60 * 1000;

        let startTime = new Date(time.startTime);
        let endTime = new Date(time.endTime);

        while (startTime < endTime) {
          let mins = (startTime.getMinutes() + "0").slice(0, 2);
          slots.push({
            id: counter,
            time:
              (startTime.getHours() < 10 ? "0" : "") +
              startTime.getHours() +
              ":" +
              mins +
              ":00",
          });
          startTime.setTime(startTime.getTime() + intervalMillis);
          counter++;
        }

        totalSlots.push(slots);
      }

      return totalSlots;
    },

    getTimeSlotsCombined(times) {
      let counter = 1;
      let totalSlots = [];

      for (let time of times) {
        let intervalMillis = time.interval * 60 * 1000;

        let startTime = new Date(time.startTime);
        let endTime = new Date(time.endTime);

        while (startTime < endTime) {
          let mins = (startTime.getMinutes() + "0").slice(0, 2);
          totalSlots.push({
            id: counter,
            time:
              (startTime.getHours() < 10 ? "0" : "") +
              startTime.getHours() +
              ":" +
              mins +
              ":00",
          });
          startTime.setTime(startTime.getTime() + intervalMillis);
          counter++;
        }
      }

      return totalSlots;
    },
    /* This takes a date and time string and changes to a Date */
    getDates(dateTime) {
      var dateTimeParse = [];
      var firstpart = dateTime.toString().split("T");
      var secondpart = firstpart[1].split(".");
      dateTimeParse = firstpart[0] + " " + secondpart[0];
      return new Date(dateTimeParse);
    },
    getTime(dateTime) {
      var dateTimeParse = [];
      dateTimeParse = dateTime.toString().split("T");
      dateTimeParse = dateTimeParse[1].split(".");
      return dateTimeParse[0];
    },
    combineTimeslotsArrays(timeslots) {
      let combined = [];
      for (let ts of timeslots) {
        combined = combined.concat(ts);
      }

      return combined;
    },
  },
};
