import React from "react";
import ChatFeed from "./ChatFeed";
import UserList from "./UserList";
import ChatMessageBox from "./ChatMessageBox";
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
         this.awayInterval = setInterval(this.awayStatus, 30000);
      });
   }

   componentWillUnmount() {
      clearInterval(this.awayInterval);
   }

   awayStatus = () => {
      const randomBot = this.state.users[
         Math.floor(Math.random() * this.state.users.length)
      ];
      if (randomBot.status === "Away") {
         this.updateBotStatus(randomBot.name, "Online");
         this.addMessage(randomBot.name, randomBot.randomStatement);
      } else {
         this.updateBotStatus(randomBot.name, "Away");
      }
   };

   timedStatusUpdate = (botName, status, statusTimeout) => {
      setTimeout(() => this.updateBotStatus(botName, status), statusTimeout);
   };

   timedBotResponse = (botName, message, messageTimeout) => {
      setTimeout(() => this.addMessage(botName, message), messageTimeout);
   };

   handleBotMessage = msg => {
      botMap.forEach((value, key, botMap) => {

         const notThisBot = msg.search(key) === -1;
         const thisBot = botMap.get(key);
         const notPlaying = thisBot.status !== `Playing ${thisBot.favoriteGame}`;
         const favoriteGameAsked = msg.search(/favou?rite game/i) !== -1;
         const askedToPlayFavoriteGame =
            msg.search(new RegExp(thisBot.favoriteGame, "i")) !== -1;
         const askedToPlayOtherGame =
            msg.search(/play/i) !== -1 &&
            msg.search(new RegExp(thisBot.favoriteGame, "i")) === -1;

         if (notThisBot) {
            return;
         }

         if (notPlaying) {
            this.timedStatusUpdate(thisBot.name, "Online", 2000);
         }
         if (favoriteGameAsked) {
            this.timedBotResponse(
               thisBot.name,
               `My favorite game is ${thisBot.favoriteGame}.`,
               3000
            );
         } else if (askedToPlayFavoriteGame) {
            this.timedBotResponse(thisBot.name, thisBot.affirmativeResponse, 4000);
            this.timedStatusUpdate(thisBot.name, `Playing ${thisBot.favoriteGame}`, 5000);
         } else if (askedToPlayOtherGame) {
            this.timedBotResponse(thisBot.name, thisBot.negativeResponse, 4000);
         } else {
            this.timedBotResponse(thisBot.name, thisBot.greeting, 2000);
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
      const users = this.state.users;
      const userIndex = users.findIndex(user => {
         return user.name === botName;
      });
      const updatedUser = update(users[userIndex], { status: { $set: newStatus } });
      const updatedArray = update(users, {
         $splice: [[userIndex, 1, updatedUser]]
      });
      this.setState({ users: updatedArray });
   };

   render() {
      return (
         <div className="container-fluid chat-container align-self-center">
            <div className="chatbox-side col-md-9 col-xl-9 col-lg-9 col-sm-10 col-xs-10">
               <div className="row-responsive">
                  <ChatFeed messageData={this.state.message || null} />
               </div>
               <div className="row-responsive">
                  <ChatMessageBox addMessage={this.addOwnMessage} />
               </div>
            </div>
            <div className="user-list-column col-md-3 col-xl-3 col-lg-3 col-sm-3 col-xs-3">
               <UserList users={this.state.users} />
            </div>
         </div>
      );
   }
}
export default ChatContainer;
