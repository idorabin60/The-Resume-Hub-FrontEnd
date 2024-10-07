/* eslint-disable react/prop-types */
import { Mail,  MapPin, Phone } from "lucide-react"
function PersonalDetailsVercel({resumeInfo}) {
  return (
    <div className="text-right">
      <a href="mailto:fionayhlin@gmail.com" className="flex items-center justify-end text-gray-600 hover:text-blue-600">
        <Mail className="w-4 h-4 ml-2" />
        {resumeInfo?.email}
      </a>
      {/* <a href="https://linkedin.com/in/fionayhlin" className="flex items-center justify-end text-gray-600 hover:text-blue-600">
        <Linkedin className="w-4 h-4 ml-2" />
        {resumeInfo?.linkdin}
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
  )
  
}

export default PersonalDetailsVercel