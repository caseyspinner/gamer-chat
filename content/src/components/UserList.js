import React from "react";
import UserCard from "./UserCard";

export default class UserList extends React.Component {
   render() {
      const usersList = this.props.users.map(user => {
         return (
            <li key={user.name}>
               <UserCard name={user.name} icon={user.icon} status={user.status} />
            </li>
         );
      });
      return (
         <div className="user-list">
            <ul>{usersList}</ul>
         </div>
      );
   }
}
