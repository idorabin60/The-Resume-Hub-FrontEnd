/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import dummy from "@/data/dummy";
import { StarIcon } from '@heroicons/react/solid';

const theme = dummy.themeColor;

// Styled component for the container with a vertical layout and soft colors
const SkillContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin: 12px 0;
  width: 100%;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SkillName = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
`;

const Filler = styled.div`
  height: 100%;
  width: ${({ value }) => value}%;
  background-color: #d1e8e4;
  background: linear-gradient(90deg, ${theme} 0%, #a0d3d6 100%);
  transition: width 0.3s ease;
`;

const SkillRating = styled.div`
  font-size: 14px;
  color: #888;
  text-align: right;
  margin-top: 8px;
`;

function ProgressWithLabel({ value }) {
  return (
    <>
      <ProgressWrapper>
        <Filler value={value} />
      </ProgressWrapper>
      <SkillRating>{value}%</SkillRating>
    </>
  );
}

function Skils({ resumeInfo }) {
  // Check if resumeInfo exists and has skills
  if (!resumeInfo?.Skills?.length) {
    return null; // Return null if no skills are present
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-600 mb-4">Skills</h2>
      <div className="space-y-4">
        {resumeInfo.Skills.map((skill, index) => (
          <SkillContainer key={index}>
            <SkillName>{skill.name}</SkillName>
            <ProgressWithLabel value={skill.rating} />
          </SkillContainer>
        ))}
      </div>
    </div>
  );
}

export default Skils;
