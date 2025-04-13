interface DashboardScreenProps {
  name: string;
}

const DashboardTopbar: React.FC<DashboardScreenProps> = ({ name }) => {
  // var name: string = "Bob Johnson";
  return (
    <div>
      {/* image of student */}
      <div className="relative w-10 h-10 overflow-hidden mb-6 bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      {/* name of student */}
      <div>
        <h1>
          Hello,
          <span className="font-bold"> {name}!</span>
        </h1>
      </div>

      <h1 className="font-bold text-3xl mt-6 ml-2 mb-6">
        Check Your results anytime!
      </h1>
    </div>
  );
};
export default DashboardTopbar;
