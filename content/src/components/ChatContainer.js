import React from "react";
import ChatFeed from "./ChatFeed";
import UserList from "./UserList";
import ChatMessageBox from "./ChatMessageBox";
import botObject from "../constants/bot.defaults";
import botMap from "../constants/bot.nameMap";
const moment = require("moment");

class ChatContainer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         message: {}
      };
   }

   handleBotMessage = msg => {
      for (var [key, value] of botMap.entries()) {
         if (msg.search(key) !== -1) {
            setTimeout(() => this.addMessage([value].name, [value].greeting), 2000);
            break;
         }
      }
      //   if (msg.search(/lebron/i) !== -1) {
      //      setTimeout(
      //         () => this.addMessage(botObject.lebron.name, botObject.lebron.greeting),
      //         2000
      //      );
      //   }
      //   if (msg.search(/han solo/i) !== -1) {
      //      setTimeout(
      //         () => this.addMessage(botObject.hanSolo.name, botObject.hanSolo.greeting),
      //         2000
      //      );
      //   }
      //   if (msg.search(/yoda/i) !== -1) {
      //      setTimeout(
      //         () => this.addMessage(botObject.yoda.name, botObject.yoda.greeting),
      //         2000
      //      );
      //   }
      //   if (msg.search(/recker/i) !== -1) {
      //      setTimeout(
      //         () => this.addMessage(botObject.recker.name, botObject.recker.greeting),
      //         2000
      //      );
      //   }
      //   if (msg.search(/miranda/i) !== -1) {
      //      setTimeout(
      //         () => this.addMessage(botObject.miranda.name, botObject.miranda.greeting),
      //         2000
      //      );
      //   }
      //   if (msg.search(/conor/i) !== -1) {
      //      setTimeout(
      //         () => this.addMessage(botObject.conor.name, botObject.conor.greeting),
      //         2000
      //      );
      //   }
   };

   addMessage = (user, text) => {
      this.setState(
         {
            message: { text, user, timeStamp: moment().format("h:mm:ss a") }
         },
         this.handleBotMessage.bind(null, text)
      );
   };

   addOwnMessage = text => this.addMessage("You", text);

   render() {
      return (
         <div className="container-fluid d-flex chat-container align-self-center">
            <div className="col-md-8 col-xl-8 col-lg-8 col-sm-10 col-xs-10">
               <div className="row-responsive">
                  <ChatFeed messageData={this.state.message || null} />
               </div>
               <div className="row-responsive">
                  <ChatMessageBox addMessage={this.addOwnMessage} />
               </div>
            </div>
            <div className="col-md-4 col-xl-4 col-lg-4 col-sm-2 col-xs-2">
               <UserList />
            </div>
         </div>
      );
   }
}
export default ChatContainer;
