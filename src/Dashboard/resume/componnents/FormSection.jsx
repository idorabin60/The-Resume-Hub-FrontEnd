/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import PersonalDetailForm from "./Forms/PersonalDetailForm";
import { useState } from "react";
import ProfessionalExpForm from "./Forms/ProfessionalExpForm";
import SummeryForm from "./Forms/SummeryForm";
import SkillsForm from "./Forms/SkillsForm";
import LanguagesForm from "./Forms/LanguagesForm";
import AboutTheJobForm from "./Forms/AboutTheJobForm";
import EducationalForm from "./Forms/EducationForm";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function FormSection() {
 
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableNavigationButtons, setEnableNavigationButtons] = useState(true);
  const { resumeId } = useParams();
  const navigation = useNavigate();

  const navigateToDownLoadPage = () => {
    navigation("/Download/" + resumeId + "/DownloadView");
  }

  const goToNextPage = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const goToThePrevPage = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button onClick={navigateToDownLoadPage} variant="outline" className="w-full sm:w-auto">
          Download View
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

          {activeIndex < 7 && (
            <Button
              variant="outline"
              disabled={!enableNavigationButtons}
              onClick={goToNextPage}
              className="w-full sm:w-auto"
            >
              Next Form
            </Button>
          )}
        </div>
      </div>

      {activeIndex === 1 ? (
        <PersonalDetailForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : activeIndex === 2 ? (
        <ProfessionalExpForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : activeIndex === 3 ? (
        <LanguagesForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : activeIndex === 4 ? (
        <SkillsForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : activeIndex === 5 ? (
        <EducationalForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : activeIndex === 7 ? (
        <SummeryForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : activeIndex === 6 ? (
        <AboutTheJobForm enableNavigationButtons={(v) => setEnableNavigationButtons(v)} />
      ) : null}
    </div>
  );
}

export default FormSection;
