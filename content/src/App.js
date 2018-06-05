import React, { Component } from "react";
import "./App.css";
import ChatContainer from "./components/ChatContainer";


class App extends Component {
   render() {
      return (
            <div className="App justify-content-center">
               <ChatContainer />
            </div>
      );
   }
}

export default App;
