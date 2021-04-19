import * as React from "react";
import { useState, useEffect } from "react";

const UserList = ({ data }: any): JSX.Element => {
  const [userList, setUserList] = useState<[string, any][]>([]);

  useEffect(() => {
    data && setUserList(data);
  });

  function getUserList() {
    console.log(userList);
    return userList.map((user, key) => {
      return <p key={key}>{user[1]}</p>;
    });
  }
  return (
    <div className="w-full h-full">
      <p className="ml-2 text-red-600">Online Players: {userList.length}</p>
      <div className=" flex flex-col items-center mt-4">{getUserList()}</div>
    </div>
  );
};

export default UserList;
