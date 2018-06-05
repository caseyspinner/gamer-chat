import React from "react";

export default class UserCard extends React.Component {
   render() {
      const styles = {
         color:
            this.props.status === "Away"
               ? "yellow"
               : this.props.status === "Online"
                  ? "green"
                  : "#6e6eff"
      };
      return (
         <div className="user-card">
            <div className="row">
               <div className="col-md-3">
                  <img src={this.props.icon} />
               </div>
               <div className="col-md-5">
                  <div className="row right-side">
                     {this.props.name}
                  </div>
                  <div style={styles} className="row right-side">
                     {this.props.status}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
