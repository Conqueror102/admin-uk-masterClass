import React, { useState } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
import DashBoard from "./DashBoard";
import Counter from "./counter";
import { FaListCheck } from "react-icons/fa6";
import { LuBadgeAlert } from "react-icons/lu";
import { PiClockCountdownBold } from "react-icons/pi";
import { LuRotateCwSquare } from "react-icons/lu";
import Table from "./table";
const Admin = () => {
  const [state, setState] = useState("overView");
  const [view, setView] = useState(false);
  const handleState = (click) => {
    setState(click);
  };

  return (
    <>
      <div className=" bg-[#eeeeee] h-screen flex gap-5  max-sm:gap-0">
        {/* dashboard */}
        <DashBoard
          overView={() => handleState("overView")}
          candidate={() => handleState("candidate")}
          isOverviewActive={state === "overView"}
          isCandidatesActive={state === "candidate"}
        />
        <div className=" w-full space-y-8  max-sm:pt-0 pr-5 max-sm:pr-0 ">
          {/* the counters */}
          {state === "overView" && (
            <div className="px-4 ">
              <p className="py-3 text-2xl font-semibold">Overview</p>
              <div
                className={"grid grid-cols-4 w-full gap-5 mb-6 max-sm:grid-cols-2 max-sm:gap-3"}
              >
                <Counter
                  icon={<FaListCheck />}
                  status="Aproveded"
                  num={30}
                  className={`text-green-600 bg-green-200`}
                />
                <Counter
                  icon={<LuBadgeAlert />}
                  status="Declined"
                  num={20}
                  className={`text-red-600 bg-red-200`}
                />
                <Counter
                  icon={<PiClockCountdownBold />}
                  status="Pending"
                  num={5}
                  className={`text-yellow-500 bg-yellow-200`}
                />
                <Counter
                  icon={<LuRotateCwSquare />}
                  status="Candidates"
                  num={130}
                  className={`text-blue-600 bg-blue-200`}
                />
              </div>

              {/* table */}
              <div
                className={`bg-[#ffffff] shadow-lg h-[400px] max-sm:h-full group overflow-hidden mb-2  p-4 rounded-lg max-sm: `}
              >
                <div className="flex w-full justify-between ">
                  <p className="font-semibold text-lg pb-3">Candidates</p>

                  {/* <input
                    type="search"
                    placeholder="search"
                    className="border  border-gray-200 mb-2 py-1 px-3 rounded-2xl"
                  /> */}
                </div>
                {/* table side */}
                <div className="bg-[#e9fff0] max-sm:p-2 rounded-lg p-4 ">
                  <Table />
                </div>
              </div>
              <div
                className={` text-green-700 text-lg  font-semibold cursor-pointer max-sm:hidden`}
              >
                <p
                  onClick={() => {
                    setView(!view);
                    handleState("candidate");
                  }}
                >
                  view all
                </p>
              </div>
            </div>
          )}

          {/* candidates */}
          {state === "candidate" && (
            <div className="bg-[#ffffff]  shadow-lg min-h-screen  p-4 rounded-lg ">
              <div className="flex w-full justify-between mb-3 ">
                <p className="font-semibold text-lg ">Candidates</p>

                <input
                  type="search"
                  placeholder="search"
                  className="border  border-gray-200  py-1 px-3 rounded-2xl"
                />
              </div>
              {/* table side */}
              <div className="bg-[#e9fff0]  rounded-lg p-4">
                <Table />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
