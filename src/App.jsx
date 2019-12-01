import React from "react";
import MainContainer from "./Components/MainContainer";
import AppBar1 from "./Components/ButtonAppBar";
import { Paper } from "@material-ui/core";

import NewContainer from "./Components/NewMain";
function App() {
  return (
    <div className="App">
      <AppBar1 />
      <br />
      <Paper />
      <NewContainer />
    </div>
  );
}

export default App;
