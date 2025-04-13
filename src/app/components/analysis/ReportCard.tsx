import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Interface for the props ReportCard expects
export interface ReportCardProps {
  // Exporting the interface
  studentName: string;
  courseName: string;
  attendance: number;
  totalHours: string;
  totalScore: string;
  percentage: number;
  overallPerformance: string;
  chartData: { name: string; value: number }[];
}

// ReportCard component: Accepts data via props and displays it
// Removed useState, useEffect, useSearchParams from here
export const ReportCard: React.FC<ReportCardProps> = ({
  // Changed to named export
  studentName,
  courseName,
  attendance,
  totalHours,
  totalScore,
  percentage,
  overallPerformance,
  chartData,
}) => {
  // Function to handle the print action
  const handlePrint = () => {
    // Ensure this runs only on the client-side
    if (typeof window !== "undefined") {
      window.print(); // Triggers the browser's print dialog
    }
  };

  return (
    // Main container for centering the card
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 printable-area">
      {/* Card container */}
      <div className="w-full max-w-2xlrounded-xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] backdrop-blur-md bg-white/80 overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-1 inline-block"></span>
            {courseName || "Course Name"} {/* Added fallback */}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {studentName || "Student Name"}, Report
          </p>{" "}
          {/* Added fallback */}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Attendance
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {attendance ?? "N/A"}
              </p>{" "}
              {/* Added fallback */}
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Total Hours
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {totalHours || "N/A"}
              </p>{" "}
              {/* Added fallback */}
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Total Score
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {totalScore || "N/A"}
              </p>{" "}
              {/* Added fallback */}
            </div>
          </div>

          {/* Percentage and Performance */}
          <div className="text-center mt-4">
            <h3 className="text-lg font-medium text-gray-700">
              {percentage ?? 0}% of the course passed {/* Added fallback */}
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {overallPerformance || "N/A"}
            </p>{" "}
            {/* Added fallback */}
            <p className="text-sm text-gray-500">Overall Performance</p>
          </div>

          {/* Bar Chart */}
          <div className="w-full h-[300px] mt-8 print:hidden">
            {chartData && chartData.length > 0 ? ( // Check if chartData exists
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  className="text-xs"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(200, 200, 200, 0.3)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      color: "#374151",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "#374151" }}
                    itemStyle={{ color: "#4b5563" }}
                  />
                  <Legend
                    wrapperStyle={{
                      color: "#6b7280",
                      fontSize: 12,
                      paddingTop: "10px",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Score"
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">
                Chart data not available.
              </p> // Fallback for chart
            )}
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 rounded-full shadow-md py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4 print:hidden"
          >
            Print Report
          </button>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .min-h-screen.bg-gray-100 {
            background-color: white !important;
            min-height: auto;
            display: block;
            padding: 0;
          }
          .printable-area > div {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
            max-width: 100% !important;
            margin: 0 auto;
            border-radius: 0 !important;
            backdrop-filter: none !important;
            background-color: white !important;
            transition: none !important;
            transform: none !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );  
};

// DummyReportCard component: Renders ReportCard with hardcoded data
// Useful for testing or if no dynamic data is needed
export const DummyReportCard = () => {
  // Changed to named export
  const dummyData: ReportCardProps = {
    studentName: "Haider Ali",
    courseName: "UI/UX Design",
    attendance: 24,
    totalHours: "150h",
    totalScore: "256/500",
    percentage: 90,
    overallPerformance: "5",
    chartData: [
      { name: "Quiz 1", value: 40 },
      { name: "Assign 1", value: 30 },
      { name: "Midterm", value: 50 },
      { name: "Quiz 2", value: 45 },
      { name: "Assign 2", value: 60 },
      { name: "Final", value: 55 },
    ],
  };
  return <ReportCard {...dummyData} />;
};

// You might not need a default export if you use named exports
// export default DummyReportCard; // Or export default ReportCard; depending on your primary use case
// ```
