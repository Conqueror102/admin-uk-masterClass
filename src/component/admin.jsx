import React, { useEffect, useState } from "react";
import DashBoard from "./DashBoard";
import Counter from "./counter";
import { FaListCheck } from "react-icons/fa6";
import { LuBadgeAlert } from "react-icons/lu";
import { PiClockCountdownBold } from "react-icons/pi";
import { LuRotateCwSquare } from "react-icons/lu";
import Table from "./table";
import axios from "axios";

const Admin = () => {
  const [state, setState] = useState("candidate");
  const [view, setView] = useState(false);

  const [candidates, setCandidates] = useState([]);
  const [counts, setCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
    total: 0,
  });

  const handleState = (click) => {
    setState(click);
  };

  const getCounts = async () => {
    try {
      const response = await axios.get(
        "https://ukmasterclassbackend.onrender.com/api/users/status-counts"
      );
      setCounts(response.data.data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        "https://ukmasterclassbackend.onrender.com/api/users/getAllUser"
      );
      setCandidates(response.data.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    getCounts();
    fetchCandidates();
  }, []);

  return (
    <div className="min-h-screen justify-center flex gap-5 max-sm:gap-0">
      <DashBoard
        overView={() => handleState("overView")}
        candidate={() => handleState("candidate")}
        isOverviewActive={state === "overView"}
        isCandidatesActive={state === "candidate"}
      />

      <div className="w-full space-y-8 max-sm:pt-0 max-sm:pr-0">
        {state === "overView" && (
          <div className="px-4">
            <p className="py-3 text-2xl font-semibold">Overview</p>
            <div className="grid grid-cols-4 w-full gap-5 mb-6 max-sm:grid-cols-2 max-sm:gap-3">
              <Counter
                icon={<FaListCheck />}
                status="Approved"
                num={counts.approved}
                className="text-green-600 bg-green-200"
              />
              <Counter
                icon={<LuBadgeAlert />}
                status="Declined"
                num={counts.rejected}
                className="text-red-600 bg-red-200"
              />
              <Counter
                icon={<PiClockCountdownBold />}
                status="Pending"
                num={counts.pending}
                className="text-yellow-500 bg-yellow-200"
              />
              <Counter
                icon={<LuRotateCwSquare />}
                status="Candidates"
                num={counts.total}
                className="text-blue-600 bg-blue-200"
              />
            </div>

            <div className="bg-white shadow-lg h-[400px] max-sm:h-full group overflow-hidden mb-2 p-4 rounded-lg max-sm:p-2">
              <div className="flex w-full justify-between">
                <p className="font-semibold text-lg pb-3">Candidates</p>
              </div>

              <div className="bg-[#e9fff0] max-sm:p-2 rounded-lg p-4">
                <Table
                  candidates={candidates}
                  setCandidates={setCandidates}
                  refreshCounts={getCounts}
                />
              </div>
            </div>

            <div className="text-green-700 text-lg font-semibold cursor-pointer max-sm:hidden">
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

        {state === "candidate" && (
          <div className="bg-white shadow-lg min-h-screen p-4 rounded-lg">
            <div className="flex w-full justify-between mb-3">
              <p className="font-semibold text-lg">Candidates</p>
              <input
                type="search"
                placeholder="search"
                className="border border-gray-200 py-1 px-3 rounded-2xl"
              />
            </div>
            <div className="bg-[#e9fff0] rounded-lg p-4">
              <Table
                candidates={candidates}
                setCandidates={setCandidates}
                refreshCounts={getCounts}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
