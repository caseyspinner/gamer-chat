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
      const randomBot = this.state.users[
         Math.floor(Math.random() * this.state.users.length)
      ];
      if (randomBot.status === "Away") {
         this.updateBotStatus(randomBot.name, "Online");
      } else {
         this.updateBotStatus(randomBot.name, "Away");
      }
   };

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

   timedCall = (method, name, text, timeout) => {
      setTimeout(method.bind(null, name, text), timeout);
   };

   statusUpdate = () => this.timedCall.bind(this, this.updateBotStatus);

   botResponse = () => this.timedCall.bind(this, this.addMessage);

   handleBotMessage = msg => {
      botMap.forEach((value, key, botMap) => {
         if (msg.search(key) === -1) {
            return;
         }

         const thisBot = botMap.get(key);
         const tellFavoriteGame = msg.search(/favou?rite game/i) !== -1;
         const hasFavoriteGame = msg.search(new RegExp(thisBot.favoriteGame, "i")) !== -1;
         const hasOtherGame = msg.search(/play/i) !== -1 && !hasFavoriteGame;

         this.changeToOnlineStatus(thisBot);

         if (tellFavoriteGame) {
            this.botResponse(`My favorite game is ${thisBot.favoriteGame}.`, 3000);
         } else if (hasFavoriteGame) {
            this.botResponse(thisBot.name, thisBot.affirmativeResponse, 4000);
            this.statusUpdate(thisBot.name, `Playing ${thisBot.favoriteGame}`, 5000);
         } else if (hasOtherGame) {
            this.botResponse(thisBot.name, thisBot.negativeResponse, 4000);
         } else {
            this.botResponse(thisBot.name, thisBot.greeting, 2000);
         }
      });
   };

   changeToOnlineStatus = bot => {
      bot.status !== `Playing ${bot.favoriteGame}` &&
         this.statusUpdate(bot.name, "Online", 2000);
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
               <UserList users={this.state.users} />
            </div>
         </div>
      );
   }
}
export default ChatContainer;
