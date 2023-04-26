import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

// FontAwesome core setup
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Specific FontAwesome Icons
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faCalendar as faCalendarSolid } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { faGuitar } from "@fortawesome/free-solid-svg-icons";

// FontAwesome Icons for Dashboard
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket as faLogout } from "@fortawesome/free-solid-svg-icons";

// Add individual icons to the FontAwesome library
library.add(faLocationDot);
library.add(faUserGroup);
library.add(faCalendar);
library.add(faCalendarWeek);
library.add(faClock);
library.add(faCalendarDays);
library.add(faPen);
library.add(faTrash);
library.add(faFlask);
library.add(faCircleExclamation);
library.add(faFilter);
library.add(faPlus);
library.add(faDownload);
library.add(faLock);
library.add(faEnvelope);
library.add(faUser);
library.add(faStarRegular);
library.add(faStarSolid);
library.add(faCalendarSolid);
library.add(faVideo);
library.add(faCaretDown);
library.add(faCaretUp);
library.add(faCircleXmark);
library.add(faMagnifyingGlass);
library.add(faCompactDisc);
library.add(faSquarePen);
library.add(faBell);
library.add(faScrewdriverWrench);
library.add(faGuitar);

// FontAwesome Icons for Dashboard
library.add(faHouseChimney);
library.add(faMusic);
library.add(faComments);
library.add(faGear);
library.add(faLogout);

import router from "./router";
import "./services/http-common.js";
import { pinia } from "./stores";

loadFonts();

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
