import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"

function SkillsForm() {
    const [skillList, setSkillList] = useState([]);
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const { toast } = useToast();

    const AddNewSkill = () => {
        setSkillList([
          ...skillList,
          {
            name: "",
            rating: "",
          },
        ]);
      };
      useEffect(() => {
        console.log(resumeInfo);
        if (resumeInfo?.Skills && resumeInfo.Skills.length > 0) {
          //HI CHAT GPT THIS LIKE WONT RUN I DONT SEE IT RUN EVEN THOUGH IT HAS AN EXPERICNR
          setSkillList(resumeInfo.Skills);
        }
      }, []);

      const RemoveSkill = () => {
        setSkillList((prevSkillList) => {
          const updatedList = prevSkillList.slice(0, -1);
    
          // Update the resumeInfo context after removing an experience
          setResumeInfo((prevState) => ({
            ...prevState,
            Skills: updatedList,
          }));
    
          return updatedList;
        });
      };

      const handleChange = (index, event) => {
        const newEntries = skillList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setSkillList(newEntries);
        setResumeInfo((prevState) => ({
          ...prevState,
          Skills: newEntries,
        }));
      };

      const onSave = () => {
        setIsLoading(true);
    
        // Sanitize experience list by providing default values for missing fields
        const sanitizedExperienceList = skillList.map((skill) => ({
          name: skill.title || "Unknown Title",
          rating: skill.rating || "Unknown rating",
         
        }));
    
        // Create the data payload with the sanitized experience list
        const data = { Skills: sanitizedExperienceList };
    
        // Log data to verify what is being sent
    
        // Make the API call to update the resume with the sanitized data
        GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
          .then((res) => {
            setIsLoading(false);
            toast({
              description: "Your Skills Details have been saved.",
            });
            setResumeInfo((prevState) => ({
              ...prevState,
              Skills: data.Skills,
            }));
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(
              "Error saving Experience:",
              error?.response?.data || error
            );
            toast({
              description: "Failed to save Skills. Please try again.",
            });
          });
      };
      return (
        <div className="p-5 shadow-md">
          <h2 className="p-5 shadow-md rounded-lg border-t-2 border-t-gray-300 mt-6 bg-gradient-to-r from-white to-blue-100 text-gray-800 text-xl font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg">
            Skills
            <p className="text-xs">Fill in your Skills</p>
          </h2>
          <div>
            {skillList.map((skill, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-2">
                    <div className="p-5 mt-10">
                      <label className="text-gray-800 font-semibold tracking-wide mb-2">
                        Skill name
                      </label>
                      <Input
                        name="name"
                        placeholder="enter skill name"
                        onChange={(event) => handleChange(index, event)}
                        value={skill.title}
                        className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                      />
                    </div>
                    <div className="p-5 mt-10">
                      <label className="text-gray-800 font-semibold tracking-wide mb-2">
                        Skill rating
                      </label>
                      <Input
                        name="rating"
                        placeholder="plaease enter rating"
                        onChange={(event) => handleChange(index, event)}
                        value={skill.rating}
                        className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-6">
            <Button
              className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
              onClick={AddNewSkill}
            >
              Add new Skill
            </Button>
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
              onClick={RemoveSkill}
            >Delete Skill</Button>
          </div>
        </div>
      );
    

}

export default SkillsForm