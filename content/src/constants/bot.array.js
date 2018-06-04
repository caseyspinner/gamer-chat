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
];
module.exports = botArray;
