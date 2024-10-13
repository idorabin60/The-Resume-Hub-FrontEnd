/* eslint-disable react/prop-types */
function ExperienceItemVercel({ exp }) {
    return (
      <div className="overflow-hidden">
        <h3 className="font-semibold">{exp?.title} - {exp.companyName}</h3>
        <p className="text-sm text-gray-600">
          {exp?.startDate} - {exp?.endDate ? exp.endDate : "present"} {exp?.city ? "|"+" "+ exp.city : ""}
        </p>
        <p className="mt-2 text-sm text-gray-800 whitespace-normal break-words">
          {exp.workSummery}
        </p>
      </div>
    );
  }
  
  export default ExperienceItemVercel;