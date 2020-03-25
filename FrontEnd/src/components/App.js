import React from "react";
import Routes from "./example";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme/theme";
import NavTabs from "./navtab";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavTabs></NavTabs>
    </ThemeProvider>
  );
}

export default App;

