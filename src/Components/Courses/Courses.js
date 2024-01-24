import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import ApiCall from "../../Utils/API";
// import { IoIosSearch } from "react-icons/io";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    courseName: "",
    description: "",
    coursePeriod: 0,
  });
  const [getData, SetGetData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    ApiCall.get("http://192.168.0.153:4000/courses", (resp) => {
      if (resp) {
        SetGetData(resp.data);
        console.log(getData);
      } else {
      }
    });
  };
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSave = () => {
    const postData = {
      courseName: data.courseName,
      description: data.description,
      coursePeriod: Number(data.coursePeriod),
    };
    ApiCall.post("http://192.168.0.153:4000/courses", postData, (resp) => {
      if (resp) {
        setOpen(false);
        setData({ courseName: "", description: "", coursePeriod: 0 });
      } else {
        console.log("Failed");
      }
    });
  };

  return (
    <div>
      <div className="w-full  bg-white max-h-[83vh] rounded-md  overflow-y-auto">
        <div className="flex justify-between border-b px-10 sticky top-0 z-[1000] pt-10 bg-white">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="w-[300px] text-black mb-10 bg-white border-2  p-1 rounded-md  focus:outline-none"
          />
          {/* <button className="absolute top-[215px] left-[570px]">
            <IoIosSearch size={25} />
          </button> */}
          <button
            className="bg-black text-[#00df9a] rounded-md w-20 font-bold mb-10"
            onClick={showDrawer}
          >
            Add
          </button>
        </div>
        {getData.length > 0 ? (
          getData?.map((items, index) => (
            <div className="p-10 flex flex-col border-b">
              <div className="flex items-center">
                <div className="rounded-full ... w-2 h-2 bg-[#00df9a]"></div>
                <h1 className="font-bold text-xl ml-4">{items.courseName}</h1>
              </div>
              <p className="mt-5 ml-6 text-gray-500/40">{items.description}</p>
              <div className="bg-gray-100 w-[300px] mt-5 ml-6 flex justify-center p-2 rounded-md">
                Course period: {items.coursePeriod} months
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 w-full flex justify-center font-bold">
            No courses found
          </div>
        )}
      </div>
      <div>
        <Drawer
          title="Add Courses"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <div>
            <label className="font-bold">
              Title<span className="text-[#00df9a]">*</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="courseName"
              value={data.courseName}
              maxLength={20}
              className="w-full mt-3 text-black mb-10 bg-white border-2  p-3 rounded-md  focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold">
              Description<span className="text-[#00df9a]">*</span>
            </label>
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              value={data.description}
              maxLength={100}
              className="w-full mt-3 text-black mb-10 bg-white border-2  p-3 rounded-md  focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold">
              Course period<span className="text-[#00df9a]">*</span>
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="coursePeriod"
              value={data.coursePeriod}
              className="w-full mt-3 text-black mb-10 bg-white border-2  p-3 rounded-md  focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              className="bg-black text-[#00df9a] rounded-md w-20 p-2 font-bold mb-10"
            >
              Save
            </button>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Courses;
