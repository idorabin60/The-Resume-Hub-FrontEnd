import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"


// eslint-disable-next-line react/prop-types
function PersonalDetailForm({ enableNavigationButtons }) {
    
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [formData,setFormData] = useState();
  const[isLoading,setIsLoading] = useState(false);
  const { toast } = useToast()
  const params = useParams();
  const onSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = formData;
    GlobalApi.updateResumePersonalDetail(params?.resumeId,data).then((res)=>{
        console.log(res)
        console.log("Toast called");
        toast({
            description: "Your Personal Details has been saved.",
          })

    }).catch((err)=>{
        console.error("Error during PUT request:", err.response ? err.response.data : err.message);
    }).finally(()=>{
        setIsLoading(false);
    })
    enableNavigationButtons(true);
  };

  const handleInputOnChange = (e) => {
    enableNavigationButtons(false);
    
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]:value
    })
    setResumeInfo({
      ...resumeInfo,
      [name]: value, // Dynamically update the respective field
    });
  };

  return (
    <div className="p-5 shadow-md">
      <h2 className="p-5 shadow-md rounded-lg border-t-2 border-t-gray-300 mt-6 bg-gradient-to-r from-white to-blue-100 text-gray-800 text-xl font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg">
        Personal Detail
        <p className="text-xs">Fill in your personal details</p>
      </h2>
      <form onSubmit={onSave} className="space-y-5">
        {/* First Name */}
        <div className="flex flex-col w-full mt-10">
          <label className="text-gray-800 font-semibold tracking-wide mb-2">First Name:</label>
          <Input
          value= {resumeInfo?.firstName || ''}
            required
            name="firstName"
            onChange={handleInputOnChange}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col w-full">
          <label className="text-gray-800 font-semibold tracking-wide mb-2">Last Name:</label>
          <Input
           value= {resumeInfo?.lastName || ''}
            required
            name="lastName"
            onChange={handleInputOnChange}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
          />
        </div>

        {/* Job Title */}
        <div className="flex flex-col w-full">
          <label className="text-gray-800 font-semibold tracking-wide mb-2">Job Title:</label>
          <Input
          value= {resumeInfo?.jobTitle || ''}
            required
            name="jobTitle"
            onChange={handleInputOnChange}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col w-full">
          <label className="text-gray-800 font-semibold tracking-wide mb-2">Phone:</label>
          <Input
          value= {resumeInfo?.phone || ''}
            required
            name="phone"
            onChange={handleInputOnChange}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="text-gray-800 font-semibold tracking-wide mb-2">Email:</label>
          <Input
          value= {resumeInfo?.email || ''}
            required
            name="email"
            type="email"
            onChange={handleInputOnChange}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col w-full">
          <label className="text-gray-800 font-semibold tracking-wide mb-2">Address:</label>
          <Input
          value= {resumeInfo?.address || ''}
            required
            name="address"
            onChange={handleInputOnChange}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
          >
            {isLoading?<LoaderCircle className="animate-spin"/>:'Save'}
            
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetailForm;