import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";


function ProfessionalExpForm() {
  const formField = {
    title: "",
    companyName: "",
    city: "",
    startDate: "",
    endDate: "",
    workSummery: "",
  };
  
  const [proExp, setProExp] = useState([formField]);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [isLoading,setIsLoading] = useState(false);


  

  const handleChange = (index, event) => {
    const { name, value } = event.target;
  
    setResumeInfo((prevResumeInfo) => {
      // Check if experience exists and is an array
      const experienceArray = Array.isArray(prevResumeInfo.experience) ? [...prevResumeInfo.experience] : [];
  
      // Clone the specific experience object at the index and update the field
      experienceArray[index] = {
        ...experienceArray[index],
        [name]: value,  // Dynamically update the correct field based on the input name
      };
  
      // Return the updated resumeInfo object with the updated experience array
      return {
        ...prevResumeInfo,
        experience: experienceArray,  // Set the updated experience back into the resumeInfo object
      };
    });
  };
  

  return (
    <div className="p-5 shadow-md">
      <h2 className="p-5 shadow-md rounded-lg border-t-2 border-t-gray-300 mt-6 bg-gradient-to-r from-white to-blue-100 text-gray-800 text-xl font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg">
        Personal Detail
        <p className="text-xs">Fill in your Pro Exp</p>
      </h2>
      <div>
        {proExp.map((expField, index) => {
          return (
            <div key={index}>
              <div className="grid grid-cols-2">
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">Work Title</label>
                  <Input
                    name="title"
                    placeholder = "enter Work Title"
                    onChange ={(event)=>handleChange(index,event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                    
                  />
                  
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">Company name</label>
                  <Input
                    name="companyName"
                    placeholder = "enter Company name"
                    onChange ={(event)=>handleChange(index,event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                    
                  />
                  
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">City</label>
                  <Input
                    name="city"
                    placeholder = "enter city"
                    onChange ={(event)=>handleChange(index,event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                    
                  />
                  
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">Start date</label>
                  <Input
                    type="date"
                    name="startDate"
                    placeholder = "enter Work Title"
                    onChange ={(event)=>handleChange(index,event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                    
                  />
                  
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">Currently working</label>
                  <Input
                    name="currentlyWorking"
                    placeholder = "enter Work Title"
                    onChange ={(event)=>handleChange(index,event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                    
                  />
                  
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">End date</label>
                  <Input
                    type="date"
                    name="endDate"
                    placeholder = "End date"
                    onChange ={(event)=>handleChange(index,event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                    
                  />
                  
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2 width-full">Work Summery</label>
                  <Input
                    name="workSummery"
                    placeholder = "enter Work Title"
                    onChange ={(event)=>handleChange(index,event,)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                    
                  />
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-6">
      
        <Button>blabla</Button>
        <Button
              type="submit"
              className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>

      </div>
    </div>
  );
}

export default ProfessionalExpForm;
