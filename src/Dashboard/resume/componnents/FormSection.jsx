/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import PersonalDetailForm from "./Forms/PersonalDetailForm";
import { useState } from "react";
import ProfessionalExpForm from "./Forms/ProfessionalExpForm";
import SummeryForm from "./Forms/SummeryForm";
import SkillsForm from "./Forms/SkillsForm";
import LanguagesForm from "./Forms/LanguagesForm";
import EducationalForm from "./Forms/EducationForm";

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
        <Button variant="outline" className="w-full sm:w-auto" >
          Theme
        </Button>

        <div className="flex space-x-2">
          {activeIndex > 1 && (
            <Button
              variant="outline"
              disabled={!enableNavigationButtons}
              onClick={goToThePrevPage}
              className="w-full sm:w-auto"
            >
              Previous Form
            </Button>
          )}

          {activeIndex<6 && (
          <Button
            variant="outline"
            disabled={!enableNavigationButtons}
            onClick={goToNextPage}
            className="w-full sm:w-auto"          >
            Next Form
          </Button>
          )}
        </div>
      </div>
          

      {activeIndex === 1 ? (
        <PersonalDetailForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : activeIndex === 2 ? (
        <LanguagesForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : activeIndex === 3 ? (
        <ProfessionalExpForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : activeIndex === 4 ? (
        <SkillsForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : activeIndex === 5 ? (
        <SummeryForm
          enableNavigationButtons={(v) => setEnableNavigationButtons(v)}
        />
      ) : activeIndex === 6 ? (
        <EducationalForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : null}
    </div>
  );
}

export default FormSection;
