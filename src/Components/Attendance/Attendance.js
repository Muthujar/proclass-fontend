import React, { useEffect, useState } from "react";
import ApiCall from "../../Utils/API";
import { useParams } from "react-router-dom";

const Attendance = () => {
  const [data, setData] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [attendance, setAttendance] = useState({
    studentId: "",
    date: "",
    reason: "",
    present: { first_off: false, second_off: false },
    absence: false,
    od: false,
  });
  const { date } = useParams();

  useEffect(() => {
    fetchData();
    checkData();
  }, []);

  const fetchData = () => {
    ApiCall.get(
      "http://192.168.0.153:4000/students?type=student",
      (resp, error) => {
        if (resp) {
          setData(resp);
        } else if (error) {
          console.log(error);
        } else {
          console.log("Unexpected problem with the response");
        }
      }
    );
  };

  const checkData = () => {
    ApiCall.get(
      `http://192.168.0.153:4000/attendence?date=${date}`,
      (resp, error) => {
        if (resp) {
          setCheckbox(resp.data);
        } else if (error) {
          console.log(error);
        } else {
          console.log("Unexpected problem with the response");
        }
      }
    );
  };
  const mergedArray = data.map((obj1) => {
    const matchingData = checkbox.find((obj2) => obj2.studentId === obj1._id);
    return matchingData ? { ...obj1, matchingData } : obj1;
  });

  const handleChange = (item, e) => {
    const { name, checked } = e.target;
    console.log(item);
    setAttendance((prevData) => ({
      ...prevData,
      present: {
        ...prevData.present,
        [name]: checked,
      },
    }));
    const postData = {
      studentId: item?.matchingData?.studentId,
      date,
      reason: attendance.reason,
      present: {
        first_off: attendance.present.first_off,
        second_off: attendance.present.second_off,
      },
      absence: attendance.absence,
      od: attendance.od,
    };
    console.log(postData);
    console.log(mergedArray);
    item?.matchingData
      ? ApiCall.post(
          `http://192.168.0.153:4000/attendence`,
          postData,
          (resp) => {
            if (resp) {
              console.log(resp);
            }
          }
        )
      : ApiCall.patch(
          `http://192.168.0.153:4000/attendence`,
          postData,
          (resp) => {
            if (resp) {
              console.log(resp);
            }
          }
        );
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
        </div>
        <div className="p-3">
          <div className="overflow-x-auto rounded-md border mt-10">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Morning
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Evening
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Absent
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    OD
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Health issue
                  </th> */}
                </tr>
              </thead>
              {mergedArray?.length > 0
                ? mergedArray?.map((item) => (
                    <tbody key={item._id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            onChange={(e) => handleChange(item, e)}
                            name="first_off"
                            checked={item?.matchingData?.present?.first_off}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            onChange={(e) => handleChange(item._id, e)}
                            name="second_off"
                            checked={
                              item?.present?.second_off
                                ? item?.present?.second_off
                                : false
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            onChange={(e) => handleChange(item._id, e)}
                            name="absence"
                            checked={item?.absence ? item?.absence : false}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            name="od"
                            onChange={(e) => handleChange(item._id, e)}
                            checked={item?.od ? item?.od : false}
                          />
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">-</td> */}
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

export default Attendance;
