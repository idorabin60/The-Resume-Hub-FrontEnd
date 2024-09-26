import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import GlobalApi from "../../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast"
import 'draft-js/dist/Draft.css';
function ProfessionalExpForm() {
  const [experinceList, setExperinceList] = useState([]);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [isLoading, setIsLoading] = useState(false);
  const params=useParams();
  const { toast } = useToast();



  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };
  useEffect(() => {
    if (resumeInfo?.Experience && resumeInfo.Experience.length > 0) {
      setExperinceList(resumeInfo.Experience);
    }
  }, [resumeInfo.Experience]);
  
  const RemoveExperience = () => {
    setExperinceList((prevExperinceList) => {
      const updatedList = prevExperinceList.slice(0, -1);
      
      // Update the resumeInfo context after removing an experience
      setResumeInfo((prevState) => ({
        ...prevState,
        Experience: updatedList,
      }));
      
      return updatedList;
    });
  };
  

  const handleChange=(index,event)=>{
    const newEntries=experinceList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setExperinceList(newEntries);
    setResumeInfo((prevState) => ({
      ...prevState,
      Experience: newEntries,
    }));


    const handleRichTextEditor=(e,name,index)=>{
      const newEntries=experinceList.slice();
      newEntries[index][name]=e.target.value;
     
      setExperinceList(newEntries);
  }

}
const onSave = () => {
  setIsLoading(true);

  // Prepare sanitized experience list
  const sanitizedExperienceList = experinceList.map(exp => {
    const sanitizedExp = { ...exp };

    // Remove optional fields if they are empty
    Object.keys(sanitizedExp).forEach((key) => {
      if (sanitizedExp[key] === "") {
        delete sanitizedExp[key]; // Omit empty fields from the payload
      }
    });

    return sanitizedExp;
  });

  // Prepare the data for the API
  const data = {
    Experience: sanitizedExperienceList,
  };

  GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
    .then((res) => {
      console.log(res);
      setIsLoading(false);
      toast({
        description: "Pro exp has been updated",
      });
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
};


  return (
    <div className="p-5 shadow-md">
      <h2 className="p-5 shadow-md rounded-lg border-t-2 border-t-gray-300 mt-6 bg-gradient-to-r from-white to-blue-100 text-gray-800 text-xl font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg">
        Personal Detail
        <p className="text-xs">Fill in your Pro Exp</p>
      </h2>
      <div>
        {experinceList.map((expField, index) => {
          return (
            <div key={index}>
              <div className="grid grid-cols-2">
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    Work Title
                  </label>
                  <Input
                    name="title"
                    placeholder="enter Work Title"
                    onChange={(event) => handleChange(index, event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    Company name
                  </label>
                  <Input
                    name="companyName"
                    placeholder="enter Company name"
                    onChange={(event) => handleChange(index, event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    City
                  </label>
                  <Input
                    name="city"
                    placeholder="enter city"
                    onChange={(event) => handleChange(index, event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    Start date
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    placeholder="enter Work Title"
                    onChange={(event) => handleChange(index, event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    Currently working
                  </label>
                  <Input
                    name="currentlyWorking"
                    placeholder="enter Work Title"
                    onChange={(event) => handleChange(index, event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    End date
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    placeholder="End date"
                    onChange={(event) => handleChange(index, event)}
                    value={expField[index]}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2 width-full">
                    Work Summery
                  </label>
                  <Input
                    name="workSummery"
                    placeholder="enter Work Title"
                    onChange={(event) => handleChange(index, event)}
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
        <Button onClick={AddNewExperience}>blabla</Button>
        <Button
          onClick={onSave}
          type="submit"
          className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
      <div className="mt-4">
        <Button
          className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
          onClick={RemoveExperience}
        ></Button>
      </div>
    </div>
  );
}

export default ProfessionalExpForm;
