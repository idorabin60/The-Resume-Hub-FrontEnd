import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
    if (resumeInfo?.Skills && resumeInfo.Skills.length > 0) {
      setSkillList(resumeInfo.Skills);
    }
  }, [resumeInfo]);

  const RemoveSkill = () => {
    setSkillList((prevSkillList) => {
      const updatedList = prevSkillList.slice(0, -1);
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
    const sanitizedSkillList = skillList.map((skill) => ({
      name: skill.name || "Unknown Title",
    }));

    const data = { Skills: sanitizedSkillList };

    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then((res) => {
        setIsLoading(false);
        toast({ description: "Your Skills Details have been saved." });
        setResumeInfo((prevState) => ({
          ...prevState,
          Skills: data.Skills,
        }));
      })
      .catch((error) => {
        setIsLoading(false);
        toast({ description: "Failed to save Skills. Please try again." });
      });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-xs">Fill in your Skills</p>
      </CardHeader>
      <CardContent>
        {skillList.map((skill, index) => (
          <Card className="mb-6" key={index}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-800 font-semibold">Skill Name</label>
                <Input
                  name="name"
                  placeholder="Enter Skill Name"
                  value={skill.name}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button variant="outline" className="w-full sm:w-auto" onClick={AddNewSkill}>
            Add New Skill
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={RemoveSkill}>
            Delete Last Skill
          </Button>
          <Button className="w-full sm:w-auto" onClick={onSave}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SkillsForm;
