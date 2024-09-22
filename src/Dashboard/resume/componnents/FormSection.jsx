/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import PersonalDetailForm from "./Forms/PersonalDetailForm";
import { useState } from "react";

function FormSection() {
  // Move useState inside the component
  const [activeIndex, setActiveIndex] = useState(2);
  const [enableNavigationButtons,setEnableNavigationButtos] = useState(true);
  console.log(activeIndex);

  const goToNextPage = () => {
    setActiveIndex(activeIndex + 1);
  };

  const goToThePrevPage = () => {
    setActiveIndex(activeIndex - 1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg">
          Theme
        </Button>

        <div className="flex space-x-2">
          {/* Conditionally render Previous button only if activeIndex is greater than 1 */}
          {activeIndex > 1 && (
            <Button
             disabled={!enableNavigationButtons}
              onClick={goToThePrevPage} // Add onClick for Previous button
              className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
            >
              Previous Form
            </Button>
          )}

          <Button
            disabled={!enableNavigationButtons}
            onClick={goToNextPage} // Add onClick for Next button
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
          >
            Next Form
          </Button>
        </div>
      </div>

      {activeIndex === 1 ? (
        <PersonalDetailForm
          enableNavigationButtons={(v) => {
            setEnableNavigationButtos(v); // Update state based on form logic
          }}
        />
      ) : null}
      {/* Personal Detail */}
      {/* Summary */}
      {/* Experience */}
      {/* Educational Detail */}
      {/* Skills */}
      {/* Languages */}
    </div>
  );
}

export default FormSection;
