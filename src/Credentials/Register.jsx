import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiCall from "../Utils/API";

const Register = () => {
  //States maintained
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    fullName: "",
    phonenumber: "",
  });
  const navigate = useNavigate();

  //functions
  const redirectLogin = () => {
    navigate("/login");
  };
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
      fullName: credentials.fullName,
      phonenumber: credentials.phonenumber,
      username: credentials.email,
      password: credentials.password,
    };
    ApiCall.post("http://192.168.0.153:4000/users/register", data, (resp) => {
      if (resp) {
        console.log(resp)
        navigate("/login");
      }
    });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex-col items-center justify-center w-[550px] mx-auto flex  border-1 shadow-lg shadow-grey-500/40 ... rounded-md"
      >
        <input
          type="text"
          placeholder="Enter your name"
          name="fullName"
          value={credentials.fullName}
          onChange={handleChange}
          className="text-black border-2 my-5  p-3 rounded-md  focus:outline-none shadow-lg shadow-grey-500/40 ... "
        />
        <input
          type="text"
          placeholder="Enter your mobile number"
          value={credentials.phonenumber}
          name="phonenumber"
          maxLength={10}
          onChange={handleChange}
          className="text-black border-2 my-5 p-3 rounded-md  focus:outline-none shadow-lg shadow-grey-500/40 ... "
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={credentials.email}
          name="email"
          onChange={handleChange}
          className="text-black border-2 my-5 p-3 rounded-md  focus:outline-none shadow-lg shadow-grey-500/40 ... "
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={credentials.password}
          name="password"
          onChange={handleChange}
          className="text-black border-2 my-5 p-3 rounded-md  focus:outline-none shadow-lg shadow-grey-500/40 ... "
        />
        <button
          type="submit"
          className="bg-black text-white font-bold rounded-md p-2 w-[30%] my-5"
        >
          Register
        </button>
        <h5 className="cursor-pointer font-bold" onClick={redirectLogin}>
          Login here...
        </h5>
      </form>
    </div>
  );
};

export default Register;
