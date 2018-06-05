import React, { Component } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ChatContainer from "./components/ChatContainer";


class App extends Component {
   render() {
      return (
         <MuiThemeProvider>
            <div className="App justify-content-center">
               <CssBaseline />
               <ChatContainer />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default App;
