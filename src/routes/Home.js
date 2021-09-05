import { dbService } from "fbase";
import React, { useState, useEffect } from "react";

import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // useEffect 에서 onSnapshot을 사용하지 않을 시.. 예전 방식
  //   const getNweets = async () => {
  //     const dbNweets = await dbService.collection("nweets").get();
  //     dbNweets.forEach((document) => {
  //       const nweetObject = {
  //         ...document.data(),
  //         id: document.id,
  //         creator: userObj.uid,
  //       };
  //       setNweets((prev) => [nweetObject, ...prev]); // 가장 최근 document를 앞으로
  //     });
  //   };

  // oderBy -> asc 오름차순 desc 내림차순
  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creator === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
