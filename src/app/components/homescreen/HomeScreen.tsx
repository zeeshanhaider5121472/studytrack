// "use client";
import Image from "next/image";
import GetStartedButton from "./GetStartedButton";
import MainText from "./MainText";
import TopBar from "./TopBar";

const HomeScreen = ({}) => {
  return (
    <div className="flex flex-col items-center px-4 pb-20 pt-16 min-h-screen  text-center">
      <TopBar />
      <Image
        src="/hp1.png"
        alt={"main image"}
        height={100}
        width={500}
        className="my-auto"
        priority
      />
      <MainText />
      <GetStartedButton />
    </div>
  );
};

export default HomeScreen;
