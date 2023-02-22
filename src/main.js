import { createApp } from "vue";
import { createPinia } from "pinia";
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

import router from "./router";

loadFonts();

const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount("#app");
