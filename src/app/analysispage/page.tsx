"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
// Import the specific component you want to use (ReportCard)
// Also import the props interface if needed for type casting
import { ClassInfo } from "../../../types/dashboardtypes";
import { ReportCard, ReportCardProps } from "../components/analysis/ReportCard";
// Assuming your ClassInfo type aligns somewhat with ReportCardProps or you'll map it

// This component will contain the logic that uses useSearchParams
function AnalysisContent() {
  const [reportData, setReportData] = useState<ReportCardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the value of the 'items' parameter
  const searchParams = useSearchParams();
  const encodedItems = searchParams.get("items"); // This hook requires Suspense

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setReportData(null); // Reset data on param change

    if (encodedItems) {
      try {
        const decodedJsonString = decodeURIComponent(encodedItems);
        const parsedItems: ClassInfo = JSON.parse(decodedJsonString); // Assuming ClassInfo is the structure from URL

        // --- MAP ClassInfo to ReportCardProps ---
        // You MUST adapt this mapping based on your actual ClassInfo structure
        const mappedData: ReportCardProps = {
          studentName: parsedItems.className || "N/A", // Example mapping
          courseName: parsedItems.className || "N/A", // Example mapping
          attendance: parsedItems.finalPercentage || 0, // Example mapping
          totalHours: parsedItems.totalScore
            ? `${parsedItems.finalPercentage}h`
            : "0h", // Example
          totalScore: parsedItems.classId,
          percentage: parsedItems.finalPercentage || 0, // Example
          overallPerformance: "N/A", // Example
          chartData: [
            { name: "Quiz 1", value: 40 },
            { name: "Assign 1", value: 30 },
            { name: "Midterm", value: 50 },
            { name: "Quiz 2", value: 45 },
            { name: "Assign 2", value: 60 },
            { name: "Final", value: 55 },
          ], // Example: Ensure chart data is available and correctly formatted
        };
        // --- END MAPPING ---

        console.log("Parsed and Mapped Data:", mappedData);
        setReportData(mappedData);
      } catch (err) {
        console.error("Error parsing data:", err);
        setError("Failed to load report data. Invalid format.");
        setReportData(null);
      }
    } else {
      setError("No report data provided in URL.");
      setReportData(null);
    }
    setIsLoading(false); // Set loading to false after processing
  }, [encodedItems]); // Re-run effect if encodedItems changes

  // Render based on state
  if (isLoading) {
    // This loading state might be brief if Suspense fallback is shown first
    return <p className="text-center p-10">Processing report data...</p>;
  }

  if (error) {
    return <p className="text-center p-10 text-red-600">Error: {error}</p>;
  }

  if (reportData) {
    // Pass the fetched and mapped data to the ReportCard component
    return <ReportCard {...reportData} />;
  }

  // Fallback if no data and no error (e.g., initial state before effect runs)
  return <p className="text-center p-10">No report to display.</p>;
}

// The main page component wraps the content in Suspense
export default function AnalysisPage() {
  return (
    <div>
      {/* Suspense Boundary: Shows fallback while useSearchParams is resolving */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p>Loading report details...</p>
          </div>
        }
      >
        <AnalysisContent />
      </Suspense>
    </div>
  );
}
