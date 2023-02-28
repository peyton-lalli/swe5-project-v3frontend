import { defineStore } from "pinia";
import RepertoireDataService from "../services/repertoire.js";
import ComposersDataService from "../services/composers.js";
import PiecesDataService from "../services/pieces.js";

export const useStudentRepertoireStore = defineStore("studentRepertoire", {
  state: () => ({ repertoireId: 0, repertoire: [] }),
  persist: true,
  getters: {},
  actions: {
    async setRepertoire(id) {
      await RepertoireDataService.getStudentId(id)
        .then((response) => {
          this.repertoireId = response.data.Repertoire[0].id;
          this.setRepertoirePieces(this.repertoireId);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async setRepertoirePieces(id) {
      await PiecesDataService.getRepertoire(id)
        .then((response) => {
          this.repertoire = response.data.Pieces;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //This isn't wokring yet but I give up
    async getComposerName(id) {
      await ComposersDataService.getId(id)
        .then((response) => {
          console.log("HERE" + response.data.Composers[0].name);
          response.data.Composers[0].name;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
