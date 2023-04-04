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
      console.log(times);
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
  },
};
