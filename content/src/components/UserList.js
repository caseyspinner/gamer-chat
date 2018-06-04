import React from "react";
import UserCard from "./UserCard";
import botObject from "../constants/bot.defaults";

class UserList extends React.Component {
   constructor(props) {
      super(props);

      //   this.state = {};
   }

   //    componentDidMount() {
   //        this.setState({users: botObject})
   //    }

   //    static getDerivedStateFromProps(nextProps, prevState) {
   //        if (nextProps.updateBot !== prevState.updateBot) {
   //            return {users: [...prevState.users, ]}
   //        }
   //    }

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

export default UserList;
