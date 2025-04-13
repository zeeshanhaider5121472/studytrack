"use client";
import { useRouter } from "next/navigation";
import { Student } from "../../../../types/dashboardtypes";

interface CardProps {
  data: Student;
  index: number;
  color: string;
  onClick: (index: number) => void;
}

const Card: React.FC<CardProps> = ({ data, index, color, onClick }) => {
  const router = useRouter();

  //
  //
  // Function to lighten a color (moved inside component for better encapsulation)
  const lightenColor = (inputColor: string, percent: number) => {
    const isHex = /^#([0-9a-f]{3}){1,2}$/i.test(inputColor);
    if (!isHex) return inputColor;

    let r = parseInt(inputColor.substring(1, 3), 16);
    let g = parseInt(inputColor.substring(3, 5), 16);
    let b = parseInt(inputColor.substring(5, 7), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));

    const toHex = (c: number) => {
      const hex = Math.round(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  //

  const handleNavigateWithData = () => {
    // 1. Serialize the array to a JSON string
    const serializedData = JSON.stringify(data.classes[index]);
    // 2. Encode the string to make it URL-safe
    const encodedData = encodeURIComponent(serializedData);
    // 3. Navigate programmatically, appending the encoded data as a query parameter
    router.push(`/analysispage?items=${encodedData}`);
  };
  //

  const lightcolor = lightenColor(color, 0.85);
  const cardHeight = 212;
  const marginTop = index === 0 ? 0 : -cardHeight * 0.6;
  return (
    <div
      onClick={() => onClick(index)} // Call onClick when the card is clicked
      className="flex flex-col w-full h-full px-5 py-7 mt-7 rounded-lg shadow-lg relative"
      style={{
        backgroundColor: lightcolor,
        marginTop: marginTop,
        height: cardHeight,
      }}
    >
      <div className="flex flex-row ">
        <div
          className="w-12 h-12 rounded-full mr-4"
          style={{
            backgroundColor: `${color}`,
          }}
        ></div>
        <div className="flex flex-col">
          <span className="font-bold">{data.classes[index].className}</span>
          <span>{data.classes[index].teacherName}</span>
        </div>
      </div>
      <div className="flex flex-row mt-4 justify-between">
        <p>Progress</p>
        <p>{data.classes[index].finalPercentage}/100</p>
      </div>
      <div className="w-full bg-white rounded-full h-1.5 dark:bg-gray-700 mt-2 mb-5">
        <div
          className=" h-1.5 rounded-full"
          style={{
            width: `${data.classes[index].finalPercentage}%`,
            backgroundColor: color,
          }} // Dynamic width based on percentage
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <button
          type="button"
          onClick={handleNavigateWithData}
          className="text-black border-1 border-black hover:bg-black hover:text-white font-medium rounded-xl text-lg py-1 max-w-lg w-full h-10"
        >
          Track Report
        </button>
      </div>
    </div>
  );
};

export default Card;
