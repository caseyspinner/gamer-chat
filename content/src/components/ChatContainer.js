import React from "react";
import ChatFeed from "./ChatFeed";
import UserList from "./UserList";
import ChatMessageBox from "./ChatMessageBox";
import botObject from "../constants/bot.defaults";
import botMap from "../constants/bot.nameMap";
const moment = require("moment");
const conorPhoto = require("../images/conor.jpg");
const reckerPhoto = require("../images/Battlefield_4_Icon.png");
const hanSoloPhoto = require("../images/Han-Solo-02-icon.png");
const lebronPhoto = require("../images/lebron.jpg");
const mirandaPhoto = require("../images/miranda.jpg");
const yodaPhoto = require("../images/yoda.jpeg");
const update = require("immutability-helper");

class ChatContainer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         message: {},
         users: [
            {
               name: "Han Solo",
               status: "Online",
               icon: hanSoloPhoto
            },
            {
               name: "Yoda",
               status: "Away",
               icon: yodaPhoto
            },
            {
               name: "Recker",
               status: "Online",
               icon: reckerPhoto
            },
            {
               name: "Lebron",
               status: "Away",
               icon: lebronPhoto
            },
            {
               name: "Miranda",
               status: "Online",
               icon: mirandaPhoto
            },
            {
               name: "Conor",
               status: "Away",
               icon: conorPhoto
            }
         ]
      };
   }

   handleBotMessage = msg => {
      botMap.forEach((value, key, botMap) => {
         if (msg.search(key) !== -1) {
            let thisBot = botMap.get(key);
            if (thisBot.status === "Away") {
               setTimeout(() => this.updateBotStatus(thisBot.name, "Online"), 2000);
            }
            if (
               msg.search(/favorite game/i) !== -1 ||
               msg.search(/favourite game/i) !== -1
            ) {
               setTimeout(
                  () =>
                     this.addMessage(
                        thisBot.name,
                        `My favorite game is ${thisBot.favoriteGame}.`
                     ),
                  3000
               );
            } else if (msg.search(new RegExp(thisBot.favoriteGame, "i")) !== -1) {
               setTimeout(
                  () => this.addMessage(thisBot.name, thisBot.affirmativeResponse),
                  4000
               );
               setTimeout(
                  () =>
                     this.updateBotStatus(thisBot.name, `Playing ${thisBot.favoriteGame}`),
                  5000
               );
            } else if (
               msg.search(/play/i) !== -1 &&
               msg.search(new RegExp(thisBot.favoriteGame, "i")) == -1
            ) {
               setTimeout(
                  () => this.addMessage(thisBot.name, thisBot.negativeResponse),
                  4000
               );
            } else {
               setTimeout(() => this.addMessage(thisBot.name, thisBot.greeting), 2000);
            }
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
