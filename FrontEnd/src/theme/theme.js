import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 980,
      lg: 1280,
      xl: 1980
    }
  },
  palette: {
    primary: {
      main: "#5bbd7f"
    },
    secondary: {
      main: "#f5fcf8"
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
