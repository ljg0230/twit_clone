import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const { target: {value}, }= event;
    setNewDisplayName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
        await userObj.updateProfile({
            displayName: newDisplayName
        })
    }
    refreshUser();
  }

//   const getMyNweets = async () => {
//     const nweets = dbService
//       .collection("nweets")
//       .orderBy("createdAt")
//       .where("creator", "==", userObj.uid)
//       .get();
//     console.log((await nweets).docs.map((doc) => doc.data()));
//   };

//   useEffect(() => {
//     getMyNweets();
//   }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
          <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName} />
          <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
