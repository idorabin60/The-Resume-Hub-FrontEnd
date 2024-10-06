/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import PersonalDetailForm from "./Forms/PersonalDetailForm";
import { useState } from "react";
import ProfessionalExpForm from "./Forms/ProfessionalExpForm";
import SummeryForm from "./Forms/SummeryForm";
import SkillsForm from "./Forms/SkillsForm";

function FormSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableNavigationButtons, setEnableNavigationButtons] = useState(true);

  const goToNextPage = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const goToThePrevPage = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg">
          Theme
        </Button>

        <div className="flex space-x-2">
          {activeIndex > 1 && (
            <Button
              disabled={!enableNavigationButtons}
              onClick={goToThePrevPage}
              className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
            >
              Previous Form
            </Button>
          )}

          <Button
            disabled={!enableNavigationButtons}
            onClick={goToNextPage}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
          >
            Next Form
          </Button>
        </div>
      </div>

      {activeIndex === 1 ? (
        <PersonalDetailForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : activeIndex === 2 ? (
        <SummeryForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : activeIndex === 3 ? (
        <ProfessionalExpForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : activeIndex === 4 ? (
        <SkillsForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : null}
    </div>
  );
}

export default FormSection;
