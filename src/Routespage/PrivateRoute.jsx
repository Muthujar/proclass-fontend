import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Courses from "../Components/Courses/Courses";
import StudentDataBase from "../Components/Students/StudentDatabase";
import AddStudent from "../Components/Students/AddStudent";
import AttendanceTrack from "../Components/Attendance/AttendanceTrack";
import Attendance from "../Components/Attendance/Attendance";

const PrivateRoute = () => {
  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">
        <div className="min-w-[250px] overflow-y-auto">
          <Sidebar />
        </div>
        <div className="w-full h-screen bg-[#F5F6F9] flex-1">
          <Navbar className="w-full h-30" />
          <div className="p-10 bg-[#F5F6F9]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/studendatabase" element={<StudentDataBase />} />
              <Route path="/addstudent" element={<AddStudent />} />
              <Route path="/attendancetrack" element={<AttendanceTrack />} />
              <Route path="/attendance/:date" element={<Attendance />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute;
