import React from "react";

class ChatFeed extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         messages: []
      };
   }

   onAddMessage = message => {
      this.setState(prevState => ({
         messages: [...prevState.messages, message]
      }));
   };

   static getDerivedStateFromProps = (nextProps, prevState) => {
      let message = nextProps.messageData;
      let currentMessages = prevState.messages;
      if (message !== currentMessages[currentMessages.length - 1]) {
         return { messages: [...prevState.messages, message] };
      }
   };

   render() {
      const messages = this.state.messages.map(message => {
         return (
            <li className="message-item">
               <strong>{message.user && `${message.user}:`}</strong> {message.text}{" "}
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
