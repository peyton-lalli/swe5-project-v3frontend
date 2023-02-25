<template>
    <v-dialog width="auto">
      <v-card>
        <v-card-title color="darkBlue">Profile Settings</v-card-title>
        <!-- Profile Picture w/ Pencil Icon -->
        <v-avatar class="bg-darkBlue">
          <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
        </v-avatar>
        <!-- Name w/ Pencil Icon -->
        <v-btn elevation="0" class="mt-16 mb-3">
          <v-icon size="xx-large">
            <font-awesome-icon
              icon="fa-solid fa-pen"
              class="text-darkBlue"
            />
          </v-icon>
        </v-btn>
        <!-- Email -->
        <v-select
          label="Major"
          :items="['Vocal Music Major', 'Computer Science Major', 'Liberal Arts Major']"
          variant="solo"
          text="darkBlue"
        ></v-select>
        <v-select
          label="Classification"
          :items="['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']"
          variant="solo"
          text="darkBlue"
        ></v-select>
        <v-select
          label="semsStudied"
          :items="['1', '2', '3', '4', '5', '6', '7', '8']"
          variant="solo"
          text="darkBlue"
        ></v-select>
        <v-card-actions>
          <v-btn color="darkBlue">Save</v-btn>
          <v-btn color="red">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>