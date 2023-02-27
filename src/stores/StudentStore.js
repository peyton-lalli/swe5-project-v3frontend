import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({ students: [] }),
  getters: {
    getFullName(state, student) {
      return (
        state.students.find(student).fName +
        " " +
        state.students.find(student).lName
      ).toUpper();
    },
  },
  actions: {
    setStudent(student) {
      console.log(this.students);
      this.students.push(student);
      console.log(this.students);
    },
    removeStudent(student) {
      this.students.pop(student);
    },
    resetState() {
      this.students = [];
    },
  },
});
