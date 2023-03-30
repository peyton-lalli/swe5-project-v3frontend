// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          darkBlue: "#2E6799",
          mediumBlue: "#3F86C5",
          lightBlue: "#B8D3EA",
          darkGray: "#343434",
          lightRed: "#DA9B9B",
        },
      },
    },
  },
});
