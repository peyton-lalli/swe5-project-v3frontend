import { defineStore } from "pinia";

export const useEventsStore = defineStore("events", {
  state: () => ({ eventsPageShown: false, events: {} }),
  persist: true,
  getters: {
    getEventsPageStatus(state) {
      return state.eventsPageShown;
    },
  },
  actions: {
    setEvents(eventsList) {
      this.events = eventsList;
    },
    showEventsPage() {
      this.eventsPageShown = true;
    },
    hideEventsPage() {
      this.eventsPageShown = false;
    },
  },
});
