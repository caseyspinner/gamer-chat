import React from "react";
import ChatFeed from "./ChatFeed";
import UserList from "./UserList";
import ChatMessageBox from "./ChatMessageBox";
import botObject from "../constants/bot.defaults";
import botMap from "../constants/bot.nameMap";
import botArray from "../constants/bot.array";
const moment = require("moment");
const update = require("immutability-helper");

class ChatContainer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         message: {},
         users: []
      };
   }

   componentDidMount() {
      this.setState({ users: botArray }, () => {
         this.awayInterval = setInterval(this.awayStatus, 40000);
      });
   }

   componentWillUnmount() {
      clearInterval(this.awayInterval);
   }

   awayStatus = () => {
      let randomBot = this.state.users[
         Math.floor(Math.random() * this.state.users.length)
      ];
      if (randomBot.status === "Away") {
         this.updateBotStatus(randomBot.name, "Online");
      } else {
         this.updateBotStatus(randomBot.name, "Away");
      }
   };

   handleBotMessage = msg => {
      botMap.forEach((value, key, botMap) => {
         if (msg.search(key) == -1) {
            return;
         }
         let thisBot = botMap.get(key);
         const response = (message, messageTimeout) => {
            setTimeout(() => this.addMessage(thisBot.name, message), messageTimeout);
         };
         const statusUpdate = (status, statusTimeout) => {
            setTimeout(() => this.updateBotStatus(thisBot.name, status), statusTimeout);
         };
         if (thisBot.status !== `Playing ${thisBot.favoriteGame}`) {
            statusUpdate("Online", 2000);
         }
         if (msg.search(/favou?rite game/i) !== -1) {
            response(`My favorite game is ${thisBot.favoriteGame}.`, 3000);
         } else if (msg.search(new RegExp(thisBot.favoriteGame, "i")) !== -1) {
            response(thisBot.affirmativeResponse, 4000);
            statusUpdate(`Playing ${thisBot.favoriteGame}`, 5000);
         } else if (
            msg.search(/play/i) !== -1 &&
            msg.search(new RegExp(thisBot.favoriteGame, "i")) == -1
         ) {
            response(thisBot.negativeResponse, 4000);
         } else {
            response(thisBot.greeting, 2000);
         }
      });
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

   updateBotStatus = (botName, newStatus) => {
      let users = this.state.users;
      let userIndex = users.findIndex(user => {
         return user.name === botName;
      });
      let updatedUser = update(users[userIndex], { status: { $set: newStatus } });
      let updatedArray = update(users, {
         $splice: [[userIndex, 1, updatedUser]]
      });
      this.setState({ users: updatedArray });
   };

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
               <UserList users={this.state.users} />
            </div>
         </div>
      );
   }
}
export default ChatContainer;
