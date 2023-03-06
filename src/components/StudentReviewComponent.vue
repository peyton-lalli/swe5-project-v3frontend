<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold"> {{ title }} Review</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeDialog()">
            <v-icon>
              <font-awesome-icon
                icon="a-solid fa-circle-xmark"
                class="text-lightBlue">
              </font-awesome-icon>
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ date }}
    </v-card-subtitle>
    <v-card-subtitle class="font-weight-bold text-darkBlue">
      {{ type }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <v-row justify="center" class="pl-5 pt-0 pb-0">
            <v-col cols="2" align-self="center">
              <v-avatar class="bg-darkBlue"> </v-avatar>
            </v-col>
            <v-col cols="10" align-self="center">
              <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                {{ instructors[0].position }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                {{ instructors[0].name }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center" class="pl-5 pt-0 pb-0 mt-0">
            <v-col cols="2" align-self="center">
              <v-avatar class="bg-darkBlue"> </v-avatar>
            </v-col>
            <v-col cols="10" align-self="center">
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
                          class="text-white" />
                      </v-avatar>
                    </v-col>
                    <v-col cols="11" class="pt-0 pb-0">
                      <v-card-title class="pb-0 font-weight-bold text-h9">
                        {{ songs.at(0).name }}
                      </v-card-title>
                      <v-card-subtitle
                        class="text-darkBlue font-weight-medium pb-2">
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
                          class="text-white" />
                      </v-avatar>
                    </v-col>
                    <v-col cols="11" class="pt-0 pb-0">
                      <v-card-title class="pb-0 font-weight-bold text-h9">
                        {{ songs.at(0).name }}
                      </v-card-title>
                      <v-card-subtitle
                        class="text-darkBlue font-weight-medium pb-2">
                        {{ songs.at(0).person }}
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                  <v-row justify="center" class="pl-0 mt-0">
                    <v-col cols="1" align-self="center">
                      <v-avatar class="bg-darkBlue">
                        <font-awesome-icon
                          icon="fa-solid fa-user"
                          class="text-white" />
                      </v-avatar>
                    </v-col>
                    <v-col cols="11" class="pt-0 pb-0">
                      <v-card-title class="pb-0 font-weight-bold text-h9">
                        {{ songs.at(0).name }}
                      </v-card-title>
                      <v-card-subtitle
                        class="text-darkBlue font-weight-medium pb-2">
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
                      class="text-white" />
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
                      class="text-white" />
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
                      class="text-white" />
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
            Critiques
          </v-card-title>
          <v-textarea variant="solo" :readonly="true" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "StudentReviewComponent",
    components: {},
    data() {
      return {
        title: "Vocal Jury",
        date: "04/22/2023",
        type: "Soprano",
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
      };
    },
    methods: {
      closeDialog() {
        this.$emit("closeDialogEvent", false);
      },
    },
  };
</script>
