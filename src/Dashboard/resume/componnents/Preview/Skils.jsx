/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import dummy from "@/data/dummy";
import SkillComponnent from "../Forms/SkillComponnent";

const theme = dummy.themeColor;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 columns
  gap: 16px; // Add some spacing between items
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // Adjust to 2 columns for smaller screens
  }
`;

function Skils({ resumeInfo }) {
  // Check if resumeInfo exists and has skills
  if (!resumeInfo?.Skills?.length) {
    return null; // Return null if no skills are present
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-600 mb-4">Skills</h2>
      <SkillsContainer>
        {resumeInfo.Skills.map((skill, index) => (
          <SkillComponnent key={index} name={skill.name} value={skill.rating} />
        ))}
      </SkillsContainer>
    </div>
  );
}

export default Skils;
