/* eslint-disable react/prop-types */
function PersonalDetail({ resumeInfo }) {
  return (
    <div className="p-6">
      {/* Name and Job Title */}
      <h2
        className="flex justify-center items-center font-bold text-2xl text-center mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h3 className="text-center font-medium text-lg mb-4">
        {resumeInfo?.jobTitle}
      </h3>

      {/* Contact Information */}
      <div className="text-center space-y-2">
        <h3 className="text-sm font-normal">{resumeInfo?.address}</h3>
        <h3 className="text-sm font-normal">
          Phone number: {resumeInfo?.phone}
        </h3>
        <h3 className="text-sm font-normal">Email: {resumeInfo?.email}</h3>
        <h3 className="text-sm font-normal">
          LinkedIn:{" "}
          <a
            href={resumeInfo?.linkdin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {resumeInfo?.linkdin}
          </a>
        </h3>
      </div>
      <hr className="border-[2px] my-2" />
    </div>
  );
}

export default PersonalDetail;
