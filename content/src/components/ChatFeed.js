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

   componentWillReceiveProps(nextProps) {
      let message = nextProps.messageData;
      nextProps.messageData !== this.props.messageData
         ? this.setState(prevState => {
              return { messages: [...prevState.messages, message] };
           })
         : null;
   }

   render() {
      const messages = this.state.messages.map(message => {
         return <li>{message.text} <span className="pull-right">{message.timeStamp}</span></li>;
      });

      return (
         <div className="chat-feed">
            <ul>{messages.length > 0 ? messages : null}</ul>
         </div>
      );
   }
}
export default ChatFeed;
