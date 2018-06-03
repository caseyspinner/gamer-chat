import React from "react";

export default class UserCard extends React.Component {
   render() {
      return (
         <div className="user-card">
            <div className="row">
               <div className="col-md-3">Status</div>
               <div className="col-md-3">
                  <img src={this.props.icon} />
               </div>
               <div className="col-md-3">
                  <div className="row right-side">{this.props.name}</div>
                  <div className="row right-side">{this.props.status}</div>
               </div>
            </div>
         </div>
      );
   }
}
