/* eslint-disable react/prop-types */
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";

function PersonalDetailsVercel({ resumeInfo }) {
  return (
    <div className="text-right">
      <a
        href={`mailto:${resumeInfo?.email}`}
        className="flex items-center justify-end text-gray-600 hover:text-blue-600"
      >
        <Mail className="w-4 h-4 ml-2" />
        {resumeInfo?.email}
      </a>
      {/* <a
        href={resumeInfo?.linkedin}
        className="flex items-center justify-end text-gray-600 hover:text-blue-600"
        target="_blank" // Opens in a new tab
        rel="noopener noreferrer" // Security precaution for external links
      >
        <Linkedin className="w-4 h-4 ml-2" />
        LinkedIn Profile
      </a> */}
      <span className="flex items-center justify-end text-gray-600">
        <MapPin className="w-4 h-4 ml-2" />
        {resumeInfo?.address}
      </span>
      <span className="flex items-center justify-end text-gray-600">
        <Phone className="w-4 h-4 ml-2" />
        {resumeInfo?.phone}
      </span>
    </div>
  );
}

export default PersonalDetailsVercel;
