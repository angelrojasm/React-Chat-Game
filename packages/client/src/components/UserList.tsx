import * as React from "react";
import { useState, useEffect } from "react";

const UserList = ({ data }: any): JSX.Element => {
  const [userList, setUserList] = useState<[string, any][]>([]);

  useEffect(() => {
    data && setUserList(data);
  });

  function getUserList() {
    return userList.map((user, key) => {
      return <p key={key}>{user[1]}</p>;
    });
  }
  return (
    <div className="w-full h-full">
      <p className="md:ml-2 ml-1 text-red-600 text-sm sm:text-base">
        Online Players: {userList.length}
      </p>
      <div className=" flex flex-col items-center mt-4 text-sm sm:text-base">
        {getUserList()}
      </div>
    </div>
  );
};

export default UserList;
