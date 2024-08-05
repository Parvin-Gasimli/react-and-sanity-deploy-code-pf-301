import React, { useState, useEffect } from "react";
import { createUser, getPosts, getUsers, urlFor } from "./services/sanity";

const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    image: "",
  });
  useEffect(() => {
    getPosts().then((res) => {
      setData(res);
    });
    getUsers().then((res) => {
      setUser(res);
    });
  }, []);
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("telephone", form.telephone);
    formData.append("image", form.image);
    console.log(Object.entries(formData));
    await createUser(formData).then((res) => {
      setUser([...user, res]);
      setForm(
        Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
      );
    });

    setLoading(false);
  };

  console.log(form);
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

      <div className="flex flex-col gap-3">
        <input
          className="border p-2 my-2 w-full rounded-md"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="border p-2 my-2  w-full rounded-md"
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
        />
        <input
          className="border p-2 my-2  w-full rounded-md"
          type="text"
          name="telephone"
          onChange={handleChange}
          value={form.telephone}
          placeholder="Telephone"
        />
        <input
          className="border p-2 my-2  w-full rounded-md"
          type="file"
          name="image"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2"
          type="submit"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
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
