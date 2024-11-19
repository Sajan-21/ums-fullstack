import React, { useEffect, useState } from "react";
import "./admin.css"; // Your custom CSS
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const authId = params.id;

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !age) {
      alert("Name, email, and age are required.");
      return;
    }

    try {
      let base64Image = null;

      // Convert the image to Base64 if it exists
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        // Wait for the reader to finish
        reader.onloadend = async () => {
          base64Image = reader.result;

          try {
            const response = await axios.post(
              "http://localhost:3000/user",
              {
                name,
                email,
                age,
                image: base64Image, // Send the base64 image
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );

            console.log("User added successfully:", response.data);

            // Update the employees list directly
            const newUser = response.data.user;
            setEmployees((prev) => [...prev, newUser]); // Add new user to employees
            setUsers((prev) => [...prev, newUser]); // Optional: if `users` should be updated too

            // Reset form state
            setAddForm(false);
            setName("");
            setEmail("");
            setImage(null);
            setAge("");

            alert("User added successfully!");
            window.location.reload();
          } catch (error) {
            console.error(
              "Error adding user:",
              error.response?.data?.message || error.message
            );
          }
        };
      } else {
        // If no image is provided, send other data without image
        const response = await axios.post(
          "http://localhost:3000/user",
          {
            name,
            email,
            age,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("User added successfully:", response.data);

        // Update the employees list directly
        const newUser = response.data.user;
        setEmployees((prev) => [...prev, newUser]); // Add new user to employees
        setUsers((prev) => [...prev, newUser]); // Optional: if `users` should be updated too

        // Reset form state
        setAddForm(false);
        setName("");
        setEmail("");
        setImage(null);
        setAge("");

        alert("User added successfully!");
      }
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const data = response.data.data;

        const adminUser = data.find(
          (user) => user.user_type?.user_type === "Admin"
        );
        const employeeUsers = data.filter(
          (user) => user.user_type?.user_type === "Employee"
        );

        setAdmin(adminUser);
        setEmployees(employeeUsers);
        console.log("employee : ", employees);
        setUsers(data);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    };

    fetchUsers();
  }, [employees]);

  const directToSingleUserView = function (id) {
    navigate(`/singleUserView/${id}/${authId}`);
  };

  const signOut = () => {
    localStorage.removeItem(authId);
    console.log("token : ", localStorage.getItem(authId));
    navigate("/");
  };

  const deleteUser = async (id) => {
    let response = await axios.delete(`http://localhost:3000/user/${id}`);
    console.log("response : ", response);
    let data = response.data;
    alert(data.message);
    navigate(0);
  };

  return (
    <div>
      {/* first nav */}
      <div className="bg-darkGreen">
        <nav className="w-11/12 m-auto flex justify-between p-3">
          <div>
            <p className="mernify-logo">MERNify Solutions</p>
          </div>
          <div>
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-white px-3 py-2 text-sm font-semibold">
                    <div className="flex gap-3 items-center">
                      {admin && admin.image && (
                        <img
                          className="size-10 rounded-full"
                          src={`http://localhost:3000/${admin.image}`}
                          alt=""
                        />
                      )}
                      {admin && admin.name}
                    </div>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <form action="#" method="POST">
                      <MenuItem>
                        <button
                          onClick={signOut}
                          type="submit"
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </div>
            <div></div>
          </div>
        </nav>
      </div>
      {/* 2nd nav */}
      <div>
        <div className="w-4/5 m-auto py-3 flex justify-between">
          <div className="font-semibold text-3xl">User Management System</div>
          <div>
            <button
              className="rounded-md px-3 py-2 bg-darkGreen text-gold"
              onClick={() => setAddForm(!addForm)} // Toggle addForm state
            >
              Add user
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-amber-50 py-10 flex-col justify-start gap-10">
        {/* Show the form only if addForm is true */}
        {addForm && (
          <div className="w-1/2 m-auto">
            <form className="bg-white p-10 rounded-lg" onSubmit={handleAddUser}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Profile
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            onChange={(e) => setName(e.target.value)}
                            id="username"
                            name="username"
                            type="text"
                            placeholder="John doe, Jane smith etc."
                            className="p-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                          />
                          <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                onChange={(e) => setImage(e.target.files[0])}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs/5 text-gray-600">
                            PNG, JPG, GIF
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Personal Information
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="age"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Age
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setAge(e.target.value)}
                          id="age"
                          name="age"
                          type="Number"
                          className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          type="email"
                          className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    className="bg-green-700 rounded-md px-3 py-2 text-white"
                    value="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Employees list */}
        <div className="w-4/5 m-auto">
          {/* <ul className="bg-white rounded-md divide-y divide-gray-400 p-10">
            {employees.length > 0 ? (
              employees.map((user) => (
                <li
                  key={user._id}
                  className="p-5 flex justify-between items-center"
                >
                  <div className="flex items-center gap-10 font-semibold">
                    <img
                      className="size-12 rounded-full"
                      src={`http://localhost:3000/${user.image}`}
                      alt=""
                    />
                    {user.name}
                  </div>
                  <div>{user.email}</div>
                  <div>{user.user_type.user_type}</div>
                  <div className="flex gap-10 items-center">
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-md" onClick={() => directToSingleUserView(user._id)}>
                      View
                    </button>
                    <button>
                      <svg
                      onClick={() => deleteUser(user._id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No employees found.</p>
            )}
          </ul> */}
          <ul className="bg-white rounded-md divide-y divide-gray-400 p-10">
            {Array.isArray(employees) && employees.length > 0 ? (
              employees.map((user) => (
                <li
                  key={user?._id || Math.random()} // Use a fallback key to avoid errors
                  className="p-5 flex justify-between items-center"
                >
                  <div className="flex items-center gap-10 font-semibold">
                    {user?.image ? (
                      <img
                        className="size-12 rounded-full"
                        src={`http://localhost:3000/${user.image}`}
                        alt={`${user.name || "User"}'s profile`}
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-gray-300 flex items-center justify-center text-white">
                        {user?.name?.[0] || "U"}
                      </div>
                    )}
                    {user?.name || "Unnamed User"}
                  </div>
                  <div>{user?.email || "No email provided"}</div>
                  <div>{user?.user_type?.user_type || "No role"}</div>
                  <div className="flex gap-10 items-center">
                    <button
                      className="bg-blue-600 text-white px-3 py-2 rounded-md"
                      onClick={() =>
                        user?._id && directToSingleUserView(user._id)
                      }
                    >
                      View
                    </button>
                    <button>
                      <svg
                        onClick={() => user?._id && deleteUser(user._id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No employees found.</p>
            )}
          </ul>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          {/* Company Info */}
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-evenly">
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="hover:text-gray-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-gray-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-gray-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-gray-400">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Admin;
