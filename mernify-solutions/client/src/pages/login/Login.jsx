import React from "react";
import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!email.includes("@") || email.length < 5) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleLoginRequest = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      const { token, user_type, id, password_count, login_count } =
        response.data.data;
      localStorage.setItem(id, token);

      if (user_type === "Admin") {
        alert(response.data.message);
        navigate(`/admin/${id}`);
      } else if (user_type === "Employee") {
        if (
          password_count === 0 &&
          (login_count === 0 || login_count === null)
        ) {
          navigate(`/resetPassword/${id}`);
        } else {
          alert(response.data.message);
          navigate(`/employee/${id}`);
        }
      } else {
        setErrorMessage("User type is not recognized.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="login-body">
      <div className="flex w-1/2 rounded shadow-2xl">
        <div className="bg-darkGreen rounded-s-md flex flex-col p-12 justify-center items-center w-full">
          <div className="mernify-logo text-center">MERNify solutions</div>
          <div className="text-gold text-xl text-center ums-text-loginPage">
            User Management System
          </div>
        </div>
        <div className="col flex justify-center items-center w-full py-10">
          <form
            onSubmit={handleLoginRequest}
            className="flex flex-col items-center justify-center gap-4 w-4/5"
          >
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <label htmlFor="email" className="text-darkGreen">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 focus:border-darkGreen w-full p-2"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <label htmlFor="password" className="text-darkGreen">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 focus:border-darkGreen w-full p-2"
                required
              />
            </div>
            {errorMessage && (
              <div className="error-message text-red-500">{errorMessage}</div>
            )}
            <div className="w-full">
              <input
                type="submit"
                value="Login"
                className="px-3 py-2 border-0 bg-darkGreen text-gold font-semibold rounded w-full"
              />
            </div>
            <div className="text-center">
              <Link className="text-darkGreen" to={"/emailVerification"}>
                Forgot Password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
