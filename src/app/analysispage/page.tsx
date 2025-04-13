// app/details/page.tsx
"use client"; // Needed to use the useSearchParams hook

import { useSearchParams } from "next/navigation"; // Hook to read query params
import { useEffect, useState } from "react";
import { ClassInfo } from "../../../types/dashboardtypes";
import ReportCard from "../components/analysis/ReportCard";

export default function AnalysisPage() {
  const [receivedItems, setReceivedItems] = useState<ClassInfo | null>(null);
  // Get the value of the 'items' parameter
  const searchParams = useSearchParams();
  const encodedItems = searchParams.get("items");

  useEffect(() => {
    if (encodedItems) {
      try {
        const decodedJsonString = decodeURIComponent(encodedItems!);
        const parsedItems: ClassInfo = JSON.parse(decodedJsonString);
        console.log(parsedItems);
        setReceivedItems(parsedItems);
      } catch (error) {
        console.error("Error parsing data:", error);
        setReceivedItems(null); // Set state to null on error
      }
    } else {
      setReceivedItems(null);
    }
  }, [encodedItems]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Analysis of {receivedItems?.className}
      </h1>
      <ReportCard />
    </div>
  );
}
