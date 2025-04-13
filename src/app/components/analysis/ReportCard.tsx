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

// Interface remains the same
interface ReportCardProps {
  studentName: string;
  courseName: string;
  attendance: number;
  totalHours: string;
  totalScore: string;
  percentage: number;
  overallPerformance: string;
  chartData: { name: string; value: number }[];
}

// ReportCard component now uses standard HTML elements and Tailwind
const ReportCard: React.FC<ReportCardProps> = ({
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
    window.print(); // Triggers the browser's print dialog
  };

  return (
    // Main container for centering the card
    // Added a 'printable-area' class to potentially target with CSS for print styles if needed
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 printable-area">
      {/* Card container using div and Tailwind classes */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] backdrop-blur-md bg-white/80 overflow-hidden">
        {/* Card Header section */}
        <div className="p-6 border-b border-gray-200">
          {/* Card Title */}
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-1 inline-block"></span>{" "}
            {/* Indicator dot */}
            {courseName}
          </h2>
          {/* Subtitle */}
          <p className="text-sm text-gray-500 mt-1">{studentName}, Report</p>
        </div>

        {/* Card Content section */}
        <div className="p-6 space-y-6">
          {/* Grid for stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Attendance
              </h3>
              <p className="text-2xl font-bold text-blue-600">{attendance}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Total Hours
              </h3>
              <p className="text-2xl font-bold text-green-600">{totalHours}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Total Score
              </h3>
              <p className="text-2xl font-bold text-purple-600">{totalScore}</p>
            </div>
          </div>

          {/* Percentage and Performance */}
          <div className="text-center mt-4">
            <h3 className="text-lg font-medium text-gray-700">
              {percentage}% of the course passed
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {overallPerformance}
            </p>
            <p className="text-sm text-gray-500">Overall Performance</p>{" "}
            {/* Added label */}
          </div>

          {/* Bar Chart */}
          {/* Added 'print:hidden' to hide chart container during print if needed */}
          <div className="w-full h-[300px] mt-8 print:hidden">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0, // Adjusted left margin
                  bottom: 5,
                }}
                className="text-xs"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(200, 200, 200, 0.3)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }} // Tailwind gray-500
                  tickLine={false}
                  axisLine={false} // Hide axis line
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false} // Hide axis line
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb", // Tailwind gray-200
                    borderRadius: "0.5rem", // Tailwind rounded-md
                    color: "#374151", // Tailwind gray-800
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Tailwind shadow-md
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  itemStyle={{ color: "#4b5563" }} // Tailwind gray-700
                />
                <Legend
                  wrapperStyle={{
                    color: "#6b7280",
                    fontSize: 12,
                    paddingTop: "10px",
                  }} // Tailwind gray-500
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6" // Tailwind blue-500
                  radius={[4, 4, 0, 0]} // Rounded top corners
                  name="Score"
                  barSize={30} // Adjust bar size if needed
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Print Button using standard button and Tailwind */}
          {/* Added onClick handler and 'print:hidden' to hide button during print */}
          <button
            onClick={handlePrint} // Added onClick handler
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 rounded-full shadow-md py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4 print:hidden" // Added print:hidden
          >
            Print Report
          </button>
        </div>
      </div>

      {/* Optional: Add print-specific styles here */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact; /* Ensures background colors/images print in Chrome/Safari */
            print-color-adjust: exact; /* Standard */
          }
          /* Hide elements not part of the report */
          .min-h-screen.bg-gray-100 {
            background-color: white !important; /* Ensure white background for print */
            min-height: auto;
            display: block; /* Override flex centering for print */
            padding: 0;
          }
          /* Style the report card container for printing */
          .printable-area > div {
            box-shadow: none !important;
            border: 1px solid #ccc !important; /* Add a border for clarity */
            max-width: 100% !important;
            margin: 0 auto; /* Center on page */
            border-radius: 0 !important; /* Remove rounding for print */
            backdrop-filter: none !important; /* Remove blur */
            background-color: white !important;
            transition: none !important; /* Remove transitions */
            transform: none !important; /* Remove scaling */
          }
          .print\:hidden {
            display: none !important; /* Ensure elements marked with print:hidden are hidden */
          }
          /* You might need more specific styles to adjust layout/margins for printing */
        }
      `}</style>
    </div>
  );
};

// DummyReportCard component remains largely the same, just renders the updated ReportCard
const DummyReportCard = () => {
  const dummyData: ReportCardProps = {
    studentName: "Haider Ali",
    courseName: "UI/UX Design",
    attendance: 24,
    totalHours: "150h",
    totalScore: "256/500",
    percentage: 90,
    overallPerformance: "5", // Representing the score value
    chartData: [
      { name: "Quiz 1", value: 40 }, // Using more descriptive names
      { name: "Assign 1", value: 30 },
      { name: "Midterm", value: 50 },
      { name: "Quiz 2", value: 45 },
      { name: "Assign 2", value: 60 },
      { name: "Final", value: 55 },
    ],
  };

  return <ReportCard {...dummyData} />;
};

export default DummyReportCard;
