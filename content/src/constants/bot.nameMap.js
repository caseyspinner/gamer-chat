import botObject from "../constants/bot.defaults";

const regexArray = [
   [/lebron/i, botObject.lebron],
   [/han solo/i, botObject.hanSolo],
   [/yoda/i, botObject.yoda],
   [/recker/i, botObject.recker],
   [/miranda/i, botObject.miranda],
   [/conor/i, botObject.conor]
];
const botMap = new Map(regexArray);
export default botMap;
