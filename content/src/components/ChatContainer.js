import React from "react";
import ChatFeed from "./ChatFeed";
import UserList from "./UserList";
import ChatMessageBox from "./ChatMessageBox";
const moment = require("moment");

class ChatContainer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         messageData: {}
      };
      this.addMessage = this.addMessage.bind(this);
   }

   handleAddMessage = msg => {
      this.addMessage("You", msg);
   };

   addMessage(user, msg) {
      let message = {};
      message.text = msg;
      message.user = user;
      message.timeStamp = moment().format("h:mm:ss a");
      this.setState({ messageData: message });
   }

   render() {
      return (
         <div className="container-fluid d-flex chat-container align-self-center">
            <div className="col-md-8 col-xl-8 col-lg-8 col-sm-10 col-xs-10">
               <div className="row-responsive">
                  <ChatFeed messageData={this.state.messageData || null} />
               </div>
               <div className="row-responsive">
                  <ChatMessageBox addMessage={this.handleAddMessage} />
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
