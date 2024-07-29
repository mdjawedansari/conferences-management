import React, { useEffect, useState } from "react";
import { getAllUSers } from "../api/user";

const AllUSers = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    const fetchUSers = async () => {
      const res = await getAllUSers();
      setUsers(res);
    };

    fetchUSers();
  }, []);
  return (
    <div>
      <h1>All users</h1>
      <div>
        {users?.data?.map((user) => (
          <ul className="" key={user._id}>
            <li>{user.fullName}</li>
            <li>{user.email}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default AllUSers;
