<template>
  <v-card>
    <v-card-title class="text-darkBlue">Profile Settings</v-card-title>
    <v-card-subtitle>
      <v-btn elevation="0">
        <v-icon>
          <font-awesome-icon
            icon="a-solid fa-circle-xmark"
            class="text-lightBlue">
          </font-awesome-icon>
        </v-icon>
      </v-btn>
    </v-card-subtitle>
      <v-card-text class="mx-auto">  
        <!-- Profile Picture w/ Pencil Icon -->
        <v-avatar class="bg-darkBlue" size="148">
          <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
        </v-avatar> 
        <v-btn elevation="0">
          <v-icon size="large">
            <font-awesome-icon
              icon="fa-solid fa-pen"
              class="text-darkBlue"
            />
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text>
        <!-- Name w/ Pencil Icon -->
        <v-text-field 
          bg-color="white"
          placeholder="Piece Title" 
          variant="solo" 
          class="text-mediumBlue"
          >
        </v-text-field> 
        <v-btn elevation="0">
          <v-icon size="large">
            <font-awesome-icon
              icon="fa-solid fa-pen"
              class="text-darkBlue"
            />
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="mx-auto">
        <!-- This won't actually be a subtitle, just for display purposes for now-->
        <v-card-subtitle >delta.roman@eagles.oc.edu</v-card-subtitle>
      </v-card-text>
      <v-card-text>
        <v-select
          bg-color="lightBlue"
          class="text-blue"
          placeholder="Major"
          :items="['Vocal Music', 'Computer Science', 'Psychology']"
          variant="solo"
          text="darkBlue"
        ></v-select>
      </v-card-text>
      <v-card-text>
        <v-select
          bg-color="lightBlue"
          class="text-blue"    
          placeholder="Classification"
          :items="['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']"
          variant="solo"
          text="darkBlue"
        ></v-select>
      </v-card-text>
      <v-card-text>  
        <v-select
          bg-color="lightBlue"
          class="text-blue"    
          placeholder="Semesters Studied"
          :items="['1', '2', '3', '4', '5', '6', '7', '8']"
          variant="solo"
          text="darkBlue"
        ></v-select>
      </v-card-text>
      <v-card-actions class="mx-auto">
          <v-btn color="darkBlue">Save</v-btn>
          <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
      </v-card-actions>
      </v-card>
</template>

<script>
  export default {
    name: "EventComponent",
    components: {},
    data() {
      return {};
    },
    methods: {
      closeDialog() {
        this.$emit("closeCourseDialogEvent", false);
      },
    },
  };
</script>