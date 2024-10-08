/* eslint-disable react/prop-types */
function SkillsSection({ resumeInfo }) {
    if (!resumeInfo?.Skills?.length) {
        return null; // Return null if no skills are present
      }
    return (
      <section className="mb-8">
        <h2 className="text-3xl font-serif mb-4">Skills</h2>
        <p className="text-sm">
          {resumeInfo?.Skills?.map((skill, index) => (
            <span key={index}>
              {skill.name}
              {index < resumeInfo.Skills.length - 1 ? " • " : ""}
            </span>
          ))}
        </p>
      </section>
    );
  }
  
  export default SkillsSection;
  