const conorPhoto = require("../images/conor.jpg");
const reckerPhoto = require("../images/Battlefield_4_Icon.png");
const hanSoloPhoto = require("../images/Han-Solo-02-icon.png");
const lebronPhoto = require("../images/lebron.jpg");
const mirandaPhoto = require("../images/miranda.jpg");
const yodaPhoto = require("../images/yoda.jpeg");

const botArray = [
   {
      name: "Han Solo",
      status: "Online",
      icon: hanSoloPhoto,
      randomStatement: "I could sure hit the cantina about now...",
   },
   {
      name: "Yoda",
      status: "Away",
      icon: yodaPhoto,
      randomStatement: "Returned, I have."
   },
   {
      name: "Recker",
      status: "Online",
      icon: reckerPhoto,
      randomStatement: "You here, Conor? I'm ready for some action."
   },
   {
      name: "LeBron",
      status: "Away",
      icon: lebronPhoto,
      randomStatement: "I'm here. Also, ball is life."
   },
   {
      name: "Miranda",
      status: "Online",
      icon: mirandaPhoto,
      randomStatement: "I'm back! Hey LeBron."
   },
   {
      name: "Conor",
      status: "Away",
      icon: conorPhoto,
      randomStatement: "Who's up for a fight?"
   }
];
module.exports = botArray;
