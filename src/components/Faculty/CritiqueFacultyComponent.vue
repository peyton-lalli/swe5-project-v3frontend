<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">
          {{ this.currentEvent.title }} Critique</v-col
        >
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeCritiqueEditDialog()">
            <v-icon>
              <font-awesome-icon
                icon="a-solid fa-circle-xmark"
                class="text-lightBlue"
              >
              </font-awesome-icon>
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ this.currentEvent.date }}
    </v-card-subtitle>
    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ type }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <v-row justify="center" class="pl-1 pt-0 pb-0">
            <v-col cols="1" align-self="center">
              <v-avatar class="bg-darkBlue"> </v-avatar>
            </v-col>
            <v-col cols="11" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                Student
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ this.currentStudent.name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center" class="pl-1 pt-0 pb-0 mt-0">
            <v-col cols="1" align-self="center">
              <v-avatar class="bg-darkBlue"> </v-avatar>
            </v-col>
            <v-col cols="11" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                {{ instructors[0].position }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ instructors[0].name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center" class="pl-1 pt-0 pb-0 mt-0">
            <v-col cols="1" align-self="center">
              <v-avatar class="bg-darkBlue"> </v-avatar>
            </v-col>
            <v-col cols="11" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                {{ instructors[1].position }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ instructors[1].name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-card-title class="pl-5 font-weight-bold text-darkGray">
              Musical Selection
            </v-card-title>
            <v-card-text>
              <v-card elevation="0" class="eventsGradient fullBorderCurve">
                <v-card-text class="pt-0">
                  <v-row justify="center" class="pl-0 mt-0">
                    <v-col cols="1" align-self="center">
                      <v-avatar class="bg-darkBlue">
                        <font-awesome-icon
                          icon="fa-solid fa-user"
                          class="text-white"
                        />
                      </v-avatar>
                    </v-col>
                    <v-col cols="11" class="pt-0 pb-0">
                      <v-card-title class="pb-0 font-weight-bold text-h9">
                        {{ songs.at(0).name }}
                      </v-card-title>
                      <v-card-subtitle
                        class="text-darkBlue font-weight-medium pb-2"
                      >
                        {{ songs.at(0).person }}
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-row>
          <v-row>
            <v-card-title class="pl-5 font-weight-bold text-darkGray">
              Additional Musical Selections
            </v-card-title>
            <v-card-text>
              <v-card elevation="0" class="eventsGradient fullBorderCurve">
                <v-card-text class="pt-0">
                  <v-row justify="center" class="pl-0 mt-0">
                    <v-col cols="1" align-self="center">
                      <v-avatar class="bg-darkBlue">
                        <font-awesome-icon
                          icon="fa-solid fa-user"
                          class="text-white"
                        />
                      </v-avatar>
                    </v-col>
                    <v-col cols="11" class="pt-0 pb-0">
                      <v-card-title class="pb-0 font-weight-bold text-h9">
                        {{ songs.at(0).name }}
                      </v-card-title>
                      <v-card-subtitle
                        class="text-darkBlue font-weight-medium pb-2"
                      >
                        {{ songs.at(0).person }}
                      </v-card-subtitle>
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
          <v-card class="eventsGradient" elevation="0">
            <v-card-text class="pl-0">
              <v-row justify="center" class="pl-5 mt-0">
                <v-col cols="1" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <font-awesome-icon
                      icon="fa-solid fa-user"
                      class="text-white"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="11">
                  <v-card-title class="text-white font-weight-bold pb-2">
                    {{ jurors.at(0) }}
                  </v-card-title>
                </v-col>
              </v-row>
              <v-row justify="center" class="pl-5 mt-0">
                <v-col cols="1" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <font-awesome-icon
                      icon="fa-solid fa-user"
                      class="text-white"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="11">
                  <v-card-title class="text-white font-weight-bold pb-2">
                    {{ jurors.at(1) }}
                  </v-card-title>
                </v-col>
              </v-row>
              <v-row justify="center" class="pl-5 mt-0">
                <v-col cols="1" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <font-awesome-icon
                      icon="fa-solid fa-user"
                      class="text-white"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="11">
                  <v-card-title class="text-white font-weight-bold pb-2">
                    {{ jurors.at(2) }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
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
              v-on:click="isExpand = !isExpand"
              v-if="!isExpand"
            >
              Make Expanded View
            </v-btn>
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient ml-4 text-white font-weight-bold"
              v-on:click="isExpand = !isExpand"
              v-if="isExpand"
            >
              Make Simplified View
            </v-btn>
          </v-card-title>
          <v-card class="fullBorderCurve mainBlur">
            <v-card-text>
              <v-row>
                <v-col>
                  <v-card-title class="font-weight-bold text-darkGray pl-1">
                    Preformace and Suggestions
                  </v-card-title>
                  <v-textarea variant="solo" />
                </v-col>
                <v-col>
                  <v-card-title class="font-weight-bold text-darkGray pl-1">
                    Musical Selection Individual Review
                  </v-card-title>
                  <v-card
                    elevation="0"
                    class="eventsGradient fullBorderCurve ma-1"
                  >
                    <v-card-text class="pt-0">
                      <v-row justify="center" class="pl-0 mt-0">
                        <v-col cols="1" align-self="center">
                          <v-avatar class="bg-darkBlue">
                            <font-awesome-icon
                              icon="fa-solid fa-user"
                              class="text-white"
                            />
                          </v-avatar>
                        </v-col>
                        <v-col cols="11" class="pt-0 pb-0">
                          <v-card-title class="pb-0 font-weight-bold text-h9">
                            {{ songs.at(0).name }}
                          </v-card-title>
                          <v-card-subtitle
                            class="text-darkBlue font-weight-medium pb-2"
                          >
                            {{ songs.at(0).person }}
                          </v-card-subtitle>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                  <v-card
                    elevation="0"
                    class="eventsGradient fullBorderCurve ma-1"
                  >
                    <v-card-text class="pt-0">
                      <v-row justify="center" class="pl-0 mt-0">
                        <v-col cols="1" align-self="center">
                          <v-avatar class="bg-darkBlue">
                            <font-awesome-icon
                              icon="fa-solid fa-user"
                              class="text-white"
                            />
                          </v-avatar>
                        </v-col>
                        <v-col cols="11" class="pt-0 pb-0">
                          <v-card-title class="pb-0 font-weight-bold text-h9">
                            {{ songs.at(0).name }}
                          </v-card-title>
                          <v-card-subtitle
                            class="text-darkBlue font-weight-medium pb-2"
                          >
                            {{ songs.at(0).person }}
                          </v-card-subtitle>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="isExpand" v-for="section in sections">
                <v-col>
                  <v-card-title class="font-weight-bold text-darkGray pl-1">
                    <v-row>
                      <v-col> {{ section.first }} </v-col>
                      <v-col class="text-right">
                        <v-select
                          label="Rating"
                          :items="ratings"
                          variant="solo"
                          size="small"
                        />
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-textarea variant="solo" rows="2" />
                </v-col>
                <v-col>
                  <v-card-title class="font-weight-bold text-darkGray pl-1">
                    <v-row>
                      <v-col> {{ section.second }} </v-col>
                      <v-col class="text-right">
                        <v-select
                          label="Rating"
                          :items="ratings"
                          variant="solo"
                          size="small"
                        />
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-textarea variant="solo" rows="2" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="text-center">
      <v-btn
        rounded="pill"
        class="buttonGradient text-white mr-3"
        @click="closeCritiqueEditDialog()"
      >
        Save
      </v-btn>
      <v-btn
        rounded="pill"
        color="#DA9B9B"
        class="text-white mr-3"
        @click="closeCritiqueEditDialog()"
      >
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CritiqueFacultyComponent",
  components: {},
  props: {
    currentEvent: {},
    currentStudent: {},
  },
  data() {
    return {
      isExpand: false,
      changeButtonLabel: "Make Expanded Critique",
      type: "TEMP",
      instructors: [
        {
          position: "Private Instructor",
          name: "Jane Doe",
        },
        {
          position: "Accompanist",
          name: "Jess Doe",
        },
      ],
      jurors: ["Jane Doe", "James Doe", "Jeff Doe"],
      songs: [
        {
          name: "Bird Upon The Tree",
          person: "Blitzstein, Marc",
        },
      ],
      ratings: ["Poor", "Fair", "Good", "Excellent"],
      sections: [
        {
          first: "Deportment",
          second: "Diction",
        },
        {
          first: "Tone",
          second: "Interpretation, Musicianship",
        },
        {
          first: "Accuracy/Intonation",
          second: "Balence Blend",
        },
      ],
    };
  },
  methods: {
    closeCritiqueEditDialog() {
      this.$emit("closeCritiqueEditDialogEvent", false);
    },
    changeButton() {
      if (isExpand) {
        this.changeButtonLabel = "Make Simplified Critique";
      } else {
        this.changeButtonLabel = "Make Expanded Critique";
      }
    },
  },
};
</script>

<style></style>
