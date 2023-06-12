import { ThemeProvider, createTheme } from "@mui/material/styles";

import Calculator from "./components/Calculator";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

interface App {
  loanAmount: React.ChangeEvent<HTMLInputElement>;
}

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Calculator></Calculator>
      </ThemeProvider>
    </div>
  );
}

export default App;
