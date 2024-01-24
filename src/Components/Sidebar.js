import React from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const logout = () => {
    cookie.remove("token");
    window.location.href = "/login";
  };
  return (
    <div className=" w-full ">
      <div className="flex flex-col w-full h-screen  justify-between bg-black text-white font-bold items-start ">
        <div className="w-full h-24 border-b-2 border-b-gray-700 flex items-center  justify-center">
          <h1 className="text-2xl text-[#00df9a]">Pro-class.</h1>
        </div>
        <div className="flex flex-col w-full h-full justify-around bg-black text-white font-bold items-start p-10 pt-3 ">
          <Link to={"/"}>Dashboard</Link>
          <Link to={"/studendatabase"}>Student database</Link>
          <Link to={"/courses"}>Courses</Link>
          <Link>Assignments</Link>
          <Link>Grades</Link>
          <Link to={"/attendancetrack"}>Attendance Tracker</Link>
          <Link>Handbook</Link>
          <Link onClick={logout}>Log out</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
