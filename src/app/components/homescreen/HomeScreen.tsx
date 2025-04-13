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
        height={500}
        width={400}
        className="my-auto w-auto h-auto"
        priority
      />
      <MainText />
      <GetStartedButton />
    </div>
  );
};

export default HomeScreen;
