"use client";
import { Student } from "../../../../types/dashboardtypes";
import Card from "./Card";
import DashboardTopbar from "./DashboardTopbar";

interface DashboardScreenProps {
  data: Student[];
}
const DashboardScreen: React.FC<DashboardScreenProps> = ({ data }) => {
  const name: string = "Alice Smith";
  const rainbow: string[] = [
    "#A333FF",
    "#1D5FC1",
    "#0F945D",
    "#FBA632",
    "#D06FD5",
    "#D56F6F",
  ];

  const handleCardClick = (index: number) => {
    console.log("Card clicked with index:", index);
    // You can add your logic here to handle the click event
  };

  return (
    <div className="flex flex-col px-4 pb-20 pt-16 min-h-screen">
      {data.map((student) => {
        return (
          student.name == name && (
            <div key={student.id} className="w-full">
              <DashboardTopbar name={student.name} />
              <div className="relative w-full ">
                {student.classes.map((cls) => {
                  return (
                    <Card
                      data={student}
                      color={
                        rainbow[Math.floor(Math.random() * rainbow.length) | 0]
                      }
                      index={student.classes.indexOf(cls)}
                      key={cls.classId}
                      onClick={handleCardClick}
                    />
                  );
                })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default DashboardScreen;
