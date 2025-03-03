import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaChartLine,
  FaRegNewspaper,
  FaArrowUp,
} from "react-icons/fa"; // class 5

const KPISection = () => {
  const [metrics, setMetrics] = useState({
    followers: 0,
    engagementRate: "0%",
    postsThisMonth: 0,
    growthRate: "0%",
  });

  useEffect(() => {
    const fetchMetrics = () => {
      fetch("https://social-dashboard-api.onrender.com/metrics")
        .then((res) => res.json())
        .then((data) => setMetrics(data))
        .catch((error) => console.error("Error fetching metrics:", error));
    };

    fetchMetrics(); // Initial fetch
    const interval = setInterval(fetchMetrics, 10000); // Auto-refresh every 10 sec

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Determine color dynamically for Growth Rate
  const getGrowthColor = (rate) => {
    const numericRate = parseFloat(rate); // Convert to number in case it's a string
    if (numericRate > 0) return "text-green-500"; // Positive growth → Green
    if (numericRate < 0) return "text-red-500"; // Negative growth → Red
    return "text-gray-500"; // No change → Gray
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {/*class 5 */}
      {/* Show loading if metrics are not yet fetched */}
      {!metrics ? (
        <p className="text-center col-span-4 text-gray-500">
          Loading metrics...
        </p>
      ) : (
        <>
          {/* KPI Card: Total Followers */}
          {/* Dynamic KPI cards with real-time updates */}
          {/*Revisar*/}
          <div className="bg-white p-6 shadow-lg rounded-lg    flex items-center gap-4 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
            <FaUsers className="text-blue-500 text-3xl" /> {/*Added class 5 */}
            <div>
              {/*Added class 5 */}
              <h3 className="text-gray-500 text-sm">Total Followers</h3>
              <p className="text-2xl font-bold">
                {metrics.followers.toLocaleString()}
              </p>
            </div>
            {/*Added class 5 */}
          </div>

          {/* KPI Card: Engagement Rate */}
          <div className="bg-white p-6 shadow-lg rounded-lg     flex items-center gap-4 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
            <FaChartLine className="text-green-500 text-3xl" />
            {/*Added class 5 */}
            {/*Added class 5 */}
            <div>
              {/*Added class 5 */}
              <h3 className="text-gray-500 text-sm">Engagement Rate</h3>
              <p className="text-2xl font-bold">{metrics.engagementRate}</p>
            </div>
            {/*Added class 5 */}
          </div>

          {/* KPI Card: Posts This Month */}
          <div className="bg-white p-6 shadow-lg rounded-lg      flex items-center gap-4 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
            <FaRegNewspaper className="text-purple-500 text-3xl" />
            {/*Added class 5 */}
            <div>
              {/*Added class 5 */}
              <h3 className="text-gray-500 text-sm">Posts this Month</h3>
              <p className="text-2xl font-bold">{metrics.postsThisMonth}</p>
            </div>
            {/*Added class 5 */}
          </div>

          {/* KPI Card: Growth Rate */}
          <div className="bg-white p-6 shadow-lg rounded-lg      flex items-center gap-4 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
            {/*  <FaArrowUp className="text-red-500 text-3xl" /> {/*Added class 5 */
            /*}
            <div>
              <h3 className="text-gray-500 text-sm">Growth Rate</h3>
              <p className="text-2xl font-bold">{metrics.growthRate}</p>
            </div> */}
            <FaArrowUp
              className={`${getGrowthColor(metrics.growthRate)} text-3xl`}
            />
            <div>
              <h3 className="text-gray-500 text-sm">Growth Rate</h3>
              <p
                className={`text-2xl font-bold ${getGrowthColor(
                  metrics.growthRate
                )}`}
              >
                {metrics.growthRate}
              </p>
            </div>
          </div>
          {/*Revisar*/}
        </>
      )}
    </div>
  );
};

export default KPISection;
