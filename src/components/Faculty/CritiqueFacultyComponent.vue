<template>
  <v-card class="pa-4 fullBorderCurve">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-calendar"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            {{ this.currentEvent.title }} Critique
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>

    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ formatDate(this.currentEvent.date) }}
    </v-card-subtitle>
    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ this.currentStudent.type }}
    </v-card-subtitle>
    <v-card-text class="px-2">
      <v-row>
        <v-col>
          <v-row justify="center" class="pl-2 pa-0">
            <v-col cols="2" align-self="center">
              <v-avatar class="bg-darkBlue"
                ><v-img :src="this.currentStudent.picture"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                Student
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ this.currentStudent.name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center" class="pa-0 pl-2 mt-0">
            <v-col cols="2" align-self="center">
              <v-avatar class="bg-darkBlue"
                ><v-img :src="this.instructor.picture"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                {{ this.instructor.position }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ this.instructor.name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center" class="pa-0 pl-2 mt-0">
            <v-col cols="2" align-self="center">
              <v-avatar class="bg-darkBlue"
                ><v-img :src="this.accompanist.picture"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                {{ this.accompanist.position }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ this.accompanist.name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-card-title class="pl-5 font-weight-bold text-darkGray">
              Musical Selection
            </v-card-title>
            <v-card-text>
              <v-card
                elevation="0"
                class="eventsGradient fullBorderCurve px-4 py-6">
                <v-card-text class="pa-0">
                  <v-row justify="center" class="ml-1">
                    <v-col cols="1" align-self="center" class="mr-5 pa-0">
                      <v-avatar class="bg-darkBlue pa-0">
                        <!-- <v-img
                          :src="this.startingSong.composer.picture"></v-img> -->
                      </v-avatar>
                    </v-col>
                    <v-col align-self="center" class="pt-0 pb-0">
                      <v-card-text class="pa-0 font-weight-bold text-body-1">
                        {{ this.startingSong.name }}
                      </v-card-text>
                      <v-card-text
                        class="text-darkBlue font-weight-bold pa-0 text-body-2">
                        {{ this.startingSong.person }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-row>
        </v-col>
        <v-col>
          <v-card-title class="font-weight-bold text-darkGray pl-0">
            Jurors
          </v-card-title>
          <v-card class="eventsGradient fullBorderCurve" elevation="0">
            <v-row v-for="juror in this.jurors" class="pl-3 pb-3">
              <v-card-text class="pl-0">
                <v-row justify="center" class="pl-5 mt-0">
                  <v-col cols="1" align-self="center">
                    <v-avatar class="bg-darkBlue">
                      <v-img :src="juror.picture"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="11">
                    <v-card-title
                      class="text-darkBlue font-weight-bold pb-2 ml-3">
                      {{ juror.name }}
                    </v-card-title>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-title class="font-weight-bold text-darkGray pl-1">
            Add Critique
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient ml-4 text-white font-weight-bold"
              v-on:click="isExpanded = !isExpanded"
              v-if="!isExpanded">
              Make Expanded View
            </v-btn>
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient ml-4 text-white font-weight-bold"
              v-on:click="isExpanded = !isExpanded"
              v-if="isExpanded">
              Make Simplified View
            </v-btn>
          </v-card-title>
          <v-card rounded="lg" class="mainBlur">
            <v-card-text>
              <v-row>
                <v-col class="pt-0">
                  <v-card-title
                    class="font-weight-bold text-darkGray pl-1 pb-3">
                    Performace and Suggestions
                  </v-card-title>
                  <v-textarea class="pa-3" v-model="critiqueText"></v-textarea>
                </v-col>
                <v-col class="pt-0">
                  <v-card-title class="font-weight-bold text-darkGray pl-1">
                    Musical Selection Individual Review
                  </v-card-title>
                  <v-card
                    rounded="lg"
                    elevation="0"
                    class="eventsGradient ma-1"
                    v-for="songs in this.songs">
                    <v-card-text class="pt-0">
                      <v-row justify="center" class="pl-0 mt-0">
                        <v-col cols="1" align-self="center">
                          <v-avatar class="bg-darkBlue">
                            <!-- <v-img :src="song.composer.picture"></v-img> -->
                          </v-avatar>
                        </v-col>
                        <v-col cols="11" class="pt-0 pb-0">
                          <v-card-title class="pb-0 font-weight-bold text-h9">
                            {{ songs.name }}
                          </v-card-title>
                          <v-card-subtitle
                            class="text-darkBlue font-weight-medium pb-2">
                            {{ songs.person }}
                          </v-card-subtitle>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="isExpanded" v-for="section in sections">
                <v-col>
                  <v-row>
                    <v-col class="pl-1">
                      <v-card-title
                        class="text-h6 font-weight-bold text-mediumBlue">
                        {{ section.first.name }}
                      </v-card-title>
                    </v-col>
                    <v-col class="pr-0">
                      <v-card-text
                        class="text-body-1 text-end font-weight-semi-bold text-darkGray pr-2">
                        Rating:
                      </v-card-text>
                    </v-col>
                    <v-col align-self="center" class="pa-0">
                      <v-select
                        class="pl-1 mr-3"
                        v-model="section.first.rating"
                        :items="ratings"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0">
                      <v-textarea
                        class="mt-0"
                        v-model="section.first.text"
                        rows="4" />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row>
                    <v-col class="pl-1">
                      <v-card-title
                        class="text-h6 font-weight-bold text-mediumBlue">
                        {{ section.second.name }}
                      </v-card-title>
                    </v-col>
                    <v-col class="pr-0">
                      <v-card-text
                        class="text-body-1 text-end font-weight-semi-bold text-darkGray pr-2">
                        Rating:
                      </v-card-text>
                    </v-col>
                    <v-col align-self="center" class="pa-0">
                      <v-select
                        class="pl-1 mr-3"
                        v-model="section.second.rating"
                        :items="ratings"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0">
                      <v-textarea
                        class="mt-0"
                        v-model="section.second.text"
                        rows="4" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="ml-auto pa-0 pr-1">
      <v-btn
        elevation="0"
        class="text-none buttonCancel ml-auto text-white font-weight-bold buttonBorder"
        @click="closeCritiqueEditDialog()">
        Cancel
      </v-btn>
      <v-btn
        elevation="0"
        class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
        @click="saveCritique()">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import ComposersDataService from "../../services/composers.js";
  import CritiquesDataService from "../../services/critiques.js";
  import EventSignUpJurorDataService from "../../services/eventsignupjuror.js";
  import EventSongsDataService from "../../services/eventsongs.js";
  import InstructorsDataService from "../../services/instructors.js";
  import UsersDataService from "../../services/users.js";
  import PiecesDataService from "../../services/pieces.js";
  import AccompanistsDataService from "../../services/accompanists.js";
  import StudentsDataService from "../../services/students.js";
  import EmailingService from "../../services/emailing.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";

  export default {
    name: "CritiqueFacultyComponent",
    components: {},
    props: {
      currentEvent: {},
      currentStudent: {},
    },
    data() {
      return {
        isExpanded: false,
        critiqueText: "",
        changeButtonLabel: "Make Expanded Critique",
        startingSong: {},
        instructor: {
          position: "Private Instructor",
          name: "",
          picture: "",
        },
        accompanist: {
          position: "Accompanist",
          name: "",
          picture: "",
        },
        jurors: [],
        songs: [],
        ratings: ["Poor", "Fair", "Good", "Excellent"],
        sections: [
          {
            first: { name: "Deportment", text: "", rating: "" },
            second: { name: "Diction", text: "", rating: "" },
          },
          {
            first: { name: "Tone", text: "", rating: "" },
            second: { name: "Interpretation", text: "", rating: "" },
          },
          {
            first: { name: "Accuracy", text: "", rating: "" },
            second: { name: "Balance", text: "", rating: "" },
          },
        ],
      };
    },
    computed: {
      ...mapStores(useUserStore),
    },
    mixins: [DateTimeMixin],
    async mounted() {
      await this.getInstructors();
      await this.getJurors();
      await this.getSongs();
      await this.getStartingSong();
    },
    methods: {
      async getInstructors() {
        var instructorId = -1;
        var accompanistId = -1;

        for (var i = 0; i < this.currentEvent.signups.length; i++) {
          if (
            this.currentEvent.signups[i].studentId == this.currentStudent.id
          ) {
            instructorId = this.currentEvent.signups[i].instructorId;
            accompanistId = this.currentEvent.signups[i].accompanistId;
          }
        }

        await InstructorsDataService.getInstructorByInstructorId(instructorId)
          .then((response) => {
            //userId = response.data.Instructors[0].userId;
            this.instructor.name =
              response.data.Instructors[0].user.fName +
              " " +
              response.data.Instructors[0].user.lName;
            this.instructor.picture = response.data.Instructors[0].user.picture;
          })
          .catch((e) => {
            console.log(e);
          });

        await AccompanistsDataService.getAccompanistById(accompanistId)
          .then((response) => {
            this.accompanist.name =
              response.data.Accompanists[0].user.fName +
              " " +
              response.data.Accompanists[0].user.lName;
            this.accompanist.picture =
              response.data.Accompanists[0].user.picture;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      async getJurors() {
        var jurorIds = [];
        var userIds = [];
        var signupId = -1;

        for (var i = 0; i < this.currentEvent.signups.length; i++) {
          if (
            this.currentEvent.signups[i].studentId == this.currentStudent.id
          ) {
            signupId = this.currentEvent.signups[i].signupId;
          }
        }

        await EventSignUpJurorDataService.getEventSignUpJurorByEventSignUp(
          signupId
        )
          .then((response) => {
            jurorIds = response.data.EventSignUpJuror;
          })
          .catch((e) => {
            console.log(e);
          });

        for (var i = 0; i < jurorIds.length; i++) {
          await InstructorsDataService.getInstructorByInstructorId(
            jurorIds[i].instructorId
          )
            .then((response) => {
              userIds.push(response.data.Instructors[0].userId);
            })
            .catch((e) => {
              console.log(e);
            });
        }

        for (var i = 0; i < userIds.length; i++) {
          await UsersDataService.getSingle(userIds[i])
            .then((response) => {
              var tempJuror = {
                name:
                  response.data.Users[i].fName +
                  " " +
                  response.data.Users[i].lName,
                picture: response.data.Users[i].picture,
              };
              this.jurors.push(tempJuror);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      },
      async getSongs() {
        var repertoires = [];
        var correctRepertoire = [];

        await StudentsDataService.getAllRepertoires(this.currentStudent.id)
          .then((response) => {
            repertoires = response.data.Students[0].repertoires;
          })
          .catch((e) => {
            console.log(e);
          });

        for (var i = 0; i < repertoires.length; i++) {
          if (
            repertoires[i].studentinstrument.instrument.name ==
            this.currentStudent.type
          ) {
            correctRepertoire = repertoires[i].repertoire;
          }
        }

        for (var i = 0; i < correctRepertoire.pieces.length; i++) {
          var pushSong = {
            name: correctRepertoire.pieces[i].name,
            person: correctRepertoire.pieces[i].composer.name,
          };

          this.songs.push(pushSong);
        }
      },
      async getStartingSong() {
        var pieceId = -1;
        var signupId = -1;
        var composerId = -1;
        var tempSong = {
          name: "",
          person: "",
        };

        for (var i = 0; i < this.currentEvent.signups.length; i++) {
          if (
            this.currentEvent.signups[i].studentId == this.currentStudent.id
          ) {
            signupId = this.currentEvent.signups[i].signupId;
          }
        }

        await EventSongsDataService.getEventSignupId(signupId)
          .then((response) => {
            pieceId = response.data.EventSongs[0].pieceId;
          })
          .catch((e) => {
            console.log(e);
          });

        await PiecesDataService.getId(pieceId)
          .then((response) => {
            tempSong.name = response.data.Pieces[0].name;
            composerId = response.data.Pieces[0].composerId;
          })
          .catch((e) => {
            console.log(e);
          });

        await ComposersDataService.getId(composerId)
          .then((response) => {
            tempSong.person = response.data.Composers[0].name;
          })
          .catch((e) => {
            console.log(e);
          });

        this.startingSong = tempSong;
      },
      async saveCritique() {
        var eventId = -1;
        var critique = {};
        var eventsignupjurorId = -1;

        for (var i = 0; i < this.currentEvent.signups.length; i++) {
          if (
            this.currentEvent.signups[i].studentId == this.currentStudent.id
          ) {
            eventId = this.currentEvent.signups[i].signupId;
          }
        }

        var jurorCreator = {
          instructorId: this.userStore.userRoleInfo.instructorId,
          eventsignupId: eventId,
        };

        await EventSignUpJurorDataService.create(jurorCreator)
          .then((response) => {
            eventsignupjurorId = response.data.id;
            console.log(eventsignupjurorId);
          })
          .catch((e) => {
            console.log(e);
          });

        if (!this.isExpanded) {
          critique = {
            isExpanded: this.isExpanded,
            eventsignupId: eventId,
            critiqueText: this.critiqueText,
            eventsignupjurorId: eventsignupjurorId,
          };
        } else {
          critique = {
            isExpanded: this.isExpanded,
            eventsignupId: eventId,
            critiqueText: this.critiqueText,
            deportment: this.sections[0].first.text,
            deportmentRating: this.sections[0].first.rating,
            diction: this.sections[0].second.text,
            dictionRating: this.sections[0].second.rating,
            tone: this.sections[1].first.text,
            toneRating: this.sections[1].first.rating,
            interpretation: this.sections[1].second.text,
            interpretationRating: this.sections[1].second.rating,
            accuracy: this.sections[2].first.text,
            accuracyRating: this.sections[2].first.rating,
            balance: this.sections[2].second.text,
            balanceRating: this.sections[2].second.rating,
            eventsignupjurorId: eventsignupjurorId,
          };
        }

        await CritiquesDataService.create(critique)
          .then((response) => {})
          .catch((e) => {
            console.log(e);
          });
        await this.sendNotification();
        this.$emit("closeCritiqueEditDialogEvent", false);
      },
      async sendNotification() {
        const emailData = {
          studentEmail: this.currentStudent.email,
          instructorEmail: this.userStore.userInfo.email,
          userId: this.userStore.userInfo.userId,
        };
        console.log(emailData);
        await EmailingService.sendCritiqueNotification(emailData)
          .then((response) => {})
          .catch((e) => {
            console.log(e);
          });
      },
      closeCritiqueEditDialog() {
        this.$emit("closeCritiqueEditDialogEvent", false);
      },
      changeButton() {
        if (isExpanded) {
          this.changeButtonLabel = "Make Simplified Critique";
        } else {
          this.changeButtonLabel = "Make Expanded Critique";
        }
      },
    },
  };
</script>

<style></style>
