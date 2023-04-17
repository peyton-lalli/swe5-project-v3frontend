export const DateTimeMixin = {
  methods: {
    get12HourTimeString(t) {
      let hours = t.getHours();
      let suffix = hours >= 12 ? "PM" : "AM";
      hours = ((hours + 11) % 12) + 1;
      let minutes = t.getMinutes() === 0 ? "00" : t.getMinutes();
      return hours + ":" + minutes + suffix;
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
        console.log(time);
        let slots = [];
        let intervalMillis = time.interval * 60 * 1000;

        let startTime = new Date(time.startTime);
        let endTime = new Date(time.endTime);

        console.log(startTime);

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
  },
};
