<template>
  <v-col>
    <v-card
      class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2">
      <v-row>
        <v-col cols="1" align-self="center">
          <v-avatar class="bg-darkBlue">
            <v-img :src="userData.picture"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="7" align-self="center">
          <v-card-title class="pb-0 font-weight-bold">
            {{ userData.lName }}, {{ userData.fName }} - {{ rolesString }}
          </v-card-title>
          <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
            {{ userData.email }}
          </v-card-subtitle>
        </v-col>
        <v-col
          cols="4"
          align-self="center"
          class="text-right pr-7 pl-7"
          v-if="userData.role != 'student'">
          <v-row>
            <v-col>
              <v-btn
                @click="this.editSingleUser = true"
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonWhite text-mediumBlue font-weight-bold">
                Edit
              </v-btn>
              <v-dialog v-model="editSingleUser" max-width="600px">
                <EditSingleUser
                  :userData="userData"
                  @closeEditSingleUserDialogEvent="
                    this.editSingleUser = false
                  "></EditSingleUser>
              </v-dialog>
            </v-col>
            <v-col v-if="!isStudent">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonWhite text-mediumBlue font-weight-bold">
                Disable
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
  import EditSingleUser from "./EditSingleUser.vue";
  export default {
    data() {
      return {
        editSingleUser: false,
        rolesString: "",
        isStudent: false,
      };
    },
    components: {
      EditSingleUser,
    },
    created() {
      this.makeRoleString();
    },
    props: {
      userData: {},
    },
    methods: {
      makeRoleString() {
        for (let role of this.userData.roles) {
          if (role.roleId === 1) {
            this.rolesString += "Student";
            this.isStudent = true;
          }
          if (role.roleId === 2) {
            if (this.rolesString !== "") {
              this.rolesString += " ,";
            }
            this.rolesString += "Faculty";
          }
          if (role.roleId === 3) {
            if (this.rolesString !== "") {
              this.rolesString += " ,";
            }
            this.rolesString += "Admin";
          }
          if (role.roleId === 4) {
            if (this.rolesString !== "") {
              this.rolesString += " ,";
            }
            this.rolesString += "Accompianist";
          }
        }
      },
    },
  };
</script>
