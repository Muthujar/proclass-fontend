import { Calendar } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceTrack = () => {
  const navigate = useNavigate();
  const onDateChange = (date, value) => {
    if (value.source === "date") {
      navigate(`/attendance/${date.format("YYYY-MM-DD")}`);
    }
  };

  return (
    <div className="w-full h-[83vh] overflow-y-auto">
      <Calendar onSelect={onDateChange} />
    </div>
  );
};

export default AttendanceTrack;
