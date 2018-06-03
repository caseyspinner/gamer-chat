import React from "react";
import UserCard from "./UserCard";
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
               favoriteGame: "Star Wars Battlefront II",
               icon: hanSoloPhoto,
               greeting: "Yooooo!",
               affirmativeResponse: "Down! I'll hop online now.",
               negativeResponse: "Nah, I'll pass."
            },
            {
               name: "Yoda",
               status: "Away",
               favoriteGame: "Star Wars Battlefront II",
               icon: yodaPhoto,
               greeting: "Greetings.",
               affirmativeResponse: "Play with you, I will.",
               negativeResponse: "Interested, I am not."
            },
            {
               name: "Recker",
               status: "Online",
               favoriteGame: "Battlefield 4",
               icon: reckerPhoto,
               greeting: "Hey.",
               affirmativeResponse: "Let's do it. Join my squad.",
               negativeResponse: "That's a negative."
            },
            {
               name: "Lebron",
               status: "Away",
               favoriteGame: "NBA Live 18",
               icon: lebronPhoto,
               greeting: "What's up?",
               affirmativeResponse: "Sounds good, see you out there!",
               negativeResponse: "Sorry, man, not my kind of game."
            },
            {
               name: "Miranda",
               status: "Online",
               favoriteGame: "Mass Effect 3",
               icon: mirandaPhoto,
               greeting: "Hello.",
               affirmativeResponse: "I could go for some Mass Effect.",
               negativeResponse: "Thanks, but no thanks."
            },
            {
               name: "Conor",
               status: "Away",
               favoriteGame: "UFC 3",
               icon: conorPhoto,
               greeting: "Ayyyy",
               affirmativeResponse:
                  "It's your funeral, lad. See you in the octagon.",
               negativeResponse: "Sorry, busy training."
            }
         ]
      };
   }

   render() {
      const usersList = this.state.users.map(user => {
         return (
            <li key={user.name}>
               <UserCard
                  name={user.name}
                  icon={user.icon}
                  status={user.status}
               />
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
