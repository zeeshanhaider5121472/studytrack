import { getallstudents } from "../../../api";
import DashboardScreen from "../components/dashboard/DashboardScreen";

export default async function DashboardPage({}) {
  const data = await getallstudents();
  // console.log(data[1].classes[0].attendance[0].date);
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto my-auto pl-5 pr-5">
        <DashboardScreen data={data}></DashboardScreen>
        {/* <HomeScreen data={data} /> */}
      </div>
    </main>
  );
}
