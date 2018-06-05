import React from "react";

class ChatFeed extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         messages: []
      };
   }

   componentDidMount() {
      this.scrollToBottom();
   }

   onAddMessage = message => {
      this.setState(prevState => ({
         messages: [...prevState.messages, message]
      }));
   };

   componentDidUpdate() {
      this.scrollToBottom();
   }

   scrollToBottom = () => (this.feed.scrollTop = this.feed.scrollHeight);

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
            <li key={message.timeStamp} className="message-item">
               <strong>{message.user && `${message.user}:`}</strong> {message.text}{" "}
               <span className="timestamp pull-right">{message.timeStamp}</span>
            </li>
         );
      });

      return (
         <div
            ref={feed => {
               this.feed = feed;
            }}
            className="chat-feed"
         >
            <ul className="message-list">{messages.length > 0 ? messages : null}</ul>
         </div>
      );
   }
}
export default ChatFeed;
