/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Progress } from "@/components/ui/progress";
import styled from "styled-components";
import dummy from "@/data/dummy";
const theme = dummy.themeColor;

// Styled component for the container to use flexbox
const SkillContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;

const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 25px;
  background-color: #e0e0e0; /* Gray background */
  border-radius: 50px;
  overflow: hidden;
`;

const Filler = styled.div`
  position: absolute;
  height: 100%;
  width: ${({ value }) => value}%;
  background-color: ${theme};
  transition: width 0.6s ease-in-out;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const SkillName = styled.div`
  margin-right: 15px;
  font-weight: bold;
`;

function ProgressWithLabel({ value }) {
  return (
    <ProgressWrapper>
      <Filler value={value}>{value}%</Filler>
    </ProgressWrapper>
  );
}

function Skils({ resumeInfo }) {
  // Check if resumeInfo exists and has skills
  if (!resumeInfo?.skills?.length) {
    return null; // Return null if no skills are present
  }

  return (
    <div className="font-bold text-center">
      <h2 className="my-5">Skills</h2>
      <div className="grid grid-cols-4 gap-4 my-4"> {/* Grid with 4 columns and gap between cells */}
        {resumeInfo.skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-start"> {/* Stack name and progress bar vertically */}
            <span className="font-semibold">{skill.name}:</span>
            <ProgressWithLabel value={skill.rating} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skils;

  

