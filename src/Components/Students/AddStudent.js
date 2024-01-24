import React, { useEffect, useState } from "react";
import ApiCall from "../../Utils/API";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [data, setData] = useState({
    name: "",
    fatherName: "",
    class: 0,
    dob: "",
    blood: "",
    healthIssue: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleAdd = () => {
    const postData = {
      name: data.name,
      fatherName: data.fatherName,
      class: data.class,
      dob: data.dob,
      blood: data.blood,
      healthIssue: data.healthIssue,
    };
    ApiCall.post(
      "http://192.168.0.153:4000/students",
      postData,
      (resp, error) => {
        if (resp.message) {
          console.log("API Response:", resp);
          navigate("/studendatabase");
        } else if (error) {
          console.error("Error in API call:", error);
        } else {
          console.log("Unexpected problem with the response");
        }
      }
    );
  };
  return (
    <div>
      <div className="w-full bg-white max-h-[83vh] rounded-md  overflow-y-auto">
        <div className="flex justify-between  flex-wrap border-b px-10 sticky top-0 z-[1000] pt-10 bg-white">
          <div className="flex flex-col ">
            <label className="font-bold">
              Names<span className="text-[#00df9a]">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              className="w-[300px] text-black mb-10 bg-white  p-1  focus:outline-none border-0 border-b-2 mt-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">
              Father Name<span className="text-[#00df9a]">*</span>
            </label>
            <input
              type="text"
              name="fatherName"
              placeholder="Enter father name"
              onChange={handleChange}
              className="w-[300px] text-black mb-10 bg-white  p-1  focus:outline-none border-0 border-b-2 mt-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">
              Class<span className="text-[#00df9a]">*</span>
            </label>
            <input
              type="text"
              name="class"
              placeholder="Enter class details (eg: 2c)"
              onChange={handleChange}
              className="w-[300px] text-black mb-10 bg-white  p-1  focus:outline-none border-0 border-b-2 mt-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">
              Blood Group<span className="text-[#00df9a]">*</span>
            </label>
            <input
              type="text"
              name="blood"
              placeholder="Enter blood group"
              onChange={handleChange}
              className="w-[300px] text-black mb-10 bg-white  p-1  focus:outline-none border-0 border-b-2 mt-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">
              DOB<span className="text-[#00df9a]">*</span>
            </label>
            <input
              type="date"
              name="dob"
              placeholder=""
              onChange={handleChange}
              className="w-[300px] text-black mb-10 bg-white  p-1  focus:outline-none border-0 border-b-2 mt-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold ">
              Health Issue<span className="text-[#00df9a]">*</span>
            </label>
            <input
              type="text"
              name="healthIssue"
              placeholder="Enter health issues 
              if any"
              onChange={handleChange}
              className="w-[300px] text-black mb-10 bg-white  p-1  focus:outline-none border-0 border-b-2 mt-3"
            />
          </div>
        </div>
        <div className="w-full flex justify-end px-10 py-5">
          <button
            className="bg-black text-[#00df9a] rounded-md w-20 font-bold mb-10 p-2"
            onClick={handleAdd}
          >
            Save
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AddStudent;
