/* eslint-disable react/prop-types */
import { Notebook } from "lucide-react";
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function ResumeItemCard({ resume }) {
    console.log("im heree")
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+"/edit"}>
    <div>
        <div className="bg-secondary p-6 flex flex-col justify-center items-center rounded-lg shadow-lg h-48 w-full hover:bg-secondary-light hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <Notebook />
            <h2>{resume.title}</h2>
      </div>
    </div>
    </Link>
  );
}

export default ResumeItemCard;
