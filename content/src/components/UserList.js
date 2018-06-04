import React from "react";
import UserCard from "./UserCard";
import botObject from "../constants/bot.defaults";
const conorPhoto = require("../images/conor.jpg");
const reckerPhoto = require("../images/Battlefield_4_Icon.png");
const hanSoloPhoto = require("../images/Han-Solo-02-icon.png");
const lebronPhoto = require("../images/lebron.jpg");
const mirandaPhoto = require("../images/miranda.jpg");
const yodaPhoto = require("../images/yoda.jpeg");

class UserList extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
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

   render() {
      const usersList = this.state.users.map(user => {
         return (
            <li key={user.name}>
               <UserCard name={user.name} icon={user.icon} status={user.status} />
            </li>
         );
      });
      return (
         <div className="user-list">
            <ul>{usersList}</ul>
         </div>
      );
   }
}

export default UserList;
