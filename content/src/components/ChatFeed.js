import React from "react";

class ChatFeed extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         messages: []
      };
   }

   onAddMessage(message) {
      this.setState(prevState => ({
         messages: [...prevState.messages, message]
      }));
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      let message = nextProps.messageData;
      if (message !== prevState.messages) {
         return { messages: [...prevState.messages, message] };
      }
   }

   render() {
      const messages = this.state.messages.map(message => {
         return (
            <li className="message-item">
               {message.user && `${message.user}:`} {message.text}{" "}
               <span className="pull-right">{message.timeStamp}</span>
            </li>
         );
      });

      return (
         <div className="chat-feed">
            <ul className="message-list">{messages.length > 0 ? messages : null}</ul>
         </div>
      );
   }
}
export default ChatFeed;
