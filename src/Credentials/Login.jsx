import React, { useState } from "react";
import student from "../Assets/cute-and-clever-smiling-young-asian-school-student-boy-with-book-cartoon-HFG9J9.jpg";
import { useNavigate } from "react-router-dom";
import ApiCall from "../Utils/API";
import cookie from "react-cookies";

const Login = () => {
  //States maintained
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: credentials.email,
      password: credentials.password,
    };
    console.log(data);
    ApiCall.post("http://192.168.0.153:4000/users/login", data, (resp) => {
      if (resp.token) {
        console.log(resp);
        const cookieValue = cookie.save("token", resp.token);
        window.location.href = "/";
      } else {
        console.log("Login failed");
      }
    });
  };
  const redirectRegister = () => {
    navigate("/register");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[750px] mx-auto flex  border-1 shadow-lg shadow-grey-500/40 ... rounded-md ">
        <img src={student} className="w-[300px] h-50" alt="Student"></img>
        <form
          className="flex flex-col items-center justify-center ml-10"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full text-black border-2  p-3 rounded-md  focus:outline-none shadow-lg shadow-grey-500/40 ... "
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full text-black border-2 mt-8 focus:outline-none  p-3 rounded-md shadow-lg shadow-grey-500/40 ..."
          />
          <button
            type="submit"
            className="bg-black text-white font-bold rounded-md p-2 w-[30%] my-5"
          >
            Log in
          </button>
          <h5 className="cursor-pointer font-bold" onClick={redirectRegister}>
            Register here.....
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Login;
