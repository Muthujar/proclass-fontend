import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../Utils/API";

const StudentDataBase = () => {
  const [data, setData] = useState({
    name: "",
    fatherName: "",
    class: 0,
    dob: "",
    blood: "",
    healthIssue: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    ApiCall.get("http://192.168.0.153:4000/students", (resp, error) => {
      if (resp) {
        setData(resp);
        console.log(resp);
      } else if (error) {
        console.error("Error in API call:", error);
      } else {
        console.log("Unexpected problem with the response");
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
          <button
            className="bg-black text-[#00df9a] rounded-md w-40 font-bold mb-10 p-3"
            onClick={() => navigate("/addstudent")}
          >
            Add Students
          </button>
        </div>
        <div className="p-3">
          <div className="overflow-x-auto rounded-md border mt-10">
            <table className="min-w-full divide-y divide-gray-100   ">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Father Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Blood Group
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    DOB
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Health issue
                  </th>
                </tr>
              </thead>
              {data.length
                ? data.map((items) => (
                    <tbody key={data.id}>
                      <tr>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          onClick={() => navigate(`/addstudent/${items._id}`)}
                        >
                          {items.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.fatherName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.blood}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.dob}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.healthIssue}
                        </td>
                      </tr>
                    </tbody>
                  ))
                : ""}
            </table>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default StudentDataBase;
