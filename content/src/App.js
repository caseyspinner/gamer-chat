import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ChatContainer from "./components/ChatContainer";

// const darkTheme = createMuiTheme({
//    palette: {
//       type: "dark"
//    }
// });

class App extends Component {
   render() {
      return (
         <MuiThemeProvider>
            <div className="App d-flex justify-content-center">
               <CssBaseline />
               {/* <header className="App-header">
                  <h1 className="App-title">Gamer Chat v1</h1>
               </header> */}
               <ChatContainer />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default App;
