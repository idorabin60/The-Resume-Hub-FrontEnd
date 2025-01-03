/* eslint-disable react/prop-types */
function ProfessionalExp({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2">Proffesional Exp</h2>
      <hr></hr>
      {resumeInfo?.Experience.map((exp, index) => {
        return (
          <div key={index}>
            <h2 className="text-sm font-bold my-3">{exp?.title}</h2>
            <h2 className="text-xs flex justify-between">
              {exp?.companyName} {exp?.city}
              {exp?.state}
              <span className="my-1">
                {" "}
                {exp?.startDate} - {exp?.endDate ? exp.endDate : "present"}
              </span>
            </h2>
            <p>{exp.workSummery}</p>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}

export default ProfessionalExp;
