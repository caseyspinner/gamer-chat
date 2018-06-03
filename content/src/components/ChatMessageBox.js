import React from "react";

export default class ChatMessageBox extends React.Component {
   submitMessage = e => {
      e.preventDefault();
      this.props.addMessage(this.myMessage.value);
      this.myMessage.value = "";
   };

   render() {
      return (
         <form className="input" onSubmit={e => this.submitMessage(e)}>
            <input
               type="text"
               name="msgName"
               ref={node => (this.myMessage = node)}
            />
            <input type="submit" value="Submit" />
         </form>
      );
   }
}