import { Student } from "./types/dashboardtypes";

// const baseurl = "http://localhost:3001";
const baseurl = "https://lumbar-gleaming-sort.glitch.me";
// const baseurl =
//   process.env.NODE_ENV === "production"
//     ? "https://lumbar-gleaming-sort.glitch.me" // This will call your Vercel serverless functions
//     : "http://localhost:3000";

// Fetch data from API
export const getallstudents = async (): Promise<Student[]> => {
  const res = await fetch(`${baseurl}/students`, { cache: "no-store" });
  const data = await res.json();
  return data;
};
