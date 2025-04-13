import Link from "next/link";

const GetStartedButton = ({}) => {
  return (
    <Link
      href={"dashboard"}
      type="button"
      className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mt-6 max-w-lg w-full h-14"
    >
      Get Started
    </Link>
  );
};

export default GetStartedButton;
