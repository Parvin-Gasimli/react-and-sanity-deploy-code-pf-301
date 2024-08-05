import React, { useState, useEffect } from "react";
import { getPosts, getUsers, urlFor } from "./services/sanity";

const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getPosts().then((res) => {
      setData(res);
    });
    getUsers().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-wrap gap-2 my-10 items-stretch">
        {data &&
          data.map((blog, index) => (
            <div className="max-w-[300px] w-full rounded-md shadow-md">
              <div key={index}>
                <img
                  src={blog?.image ? urlFor(blog.image) : ""}
                  alt={blog.name}
                  className="rounded-t-md w-full h-[300px] object-cover"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{blog?.name}</h1>
                  <p className="text-sm text-gray-500">{blog?.date}</p>
                  <p className="text-sm text-gray-500">{blog?.desc}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-wrap gap-2 my-10 items-stretch">
        {user &&
          user.map((user, index) => (
            <div className="max-w-[300px] w-full rounded-md shadow-md">
              <div key={index}>
                <img
                  src={user?.image ? urlFor(user.image) : ""}
                  alt={user.name}
                  className="rounded-t-md w-full h-[300px] object-cover"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{user?.name}</h1>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <p className="text-sm text-gray-500">{user?.telephone}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
