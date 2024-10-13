/* eslint-disable react/prop-types */
function ExperienceItemVercel({ exp }) {
  // Replace newline characters with <br> for proper rendering
  const formattedWorkSummery = exp?.workSummery ? exp.workSummery.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  )) : null;

  return (
    <div className="overflow-hidden">
      <h3 className="font-semibold">{exp?.title} - {exp.companyName}</h3>
      <p className="text-sm text-gray-600">
        {exp?.startDate} - {exp?.endDate ? exp.endDate : "present"} {exp?.city ? "|"+" "+ exp.city : ""}
      </p>
      <p className="mt-2 text-sm text-gray-800 whitespace-normal break-words">
        {formattedWorkSummery}
      </p>
    </div>
  );
}

export default ExperienceItemVercel;
