import { useState, useContext, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { GeminaiChatSession } from "../../../../../service/GeminaiApi";

function ProfessionalExpForm() {
  const [experinceList, setExperinceList] = useState([]);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();

  const formatWorkSummaryPromptTemplate = `
  Please rewrite the following text to correct any grammar mistakes and ensure it's concise and clear. Format it as a professional CV work summary. 
  - Avoid excessive bold or italic formatting.
  - Use bullet points to highlight key responsibilities and achievements, but make the overall tone natural and human-written.
  - Keep the language professional but not overly formal.
  Return only the formatted text, without additional explanations or comments.
  `;
  useEffect(() => {
    if (resumeInfo?.Experience && resumeInfo.Experience.length > 0) {
      setExperinceList(resumeInfo.Experience);
    }
  }, [resumeInfo]);

  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: "",
        companyName: "",
        city: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperinceList((prevExperinceList) => {
      const updatedList = prevExperinceList.slice(0, -1);
      setResumeInfo((prevState) => ({
        ...prevState,
        Experience: updatedList,
      }));
      return updatedList;
    });
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = experinceList.slice();
    newEntries[index][name] = value;
    setExperinceList(newEntries);
    setResumeInfo((prevState) => ({
      ...prevState,
      Experience: newEntries,
    }));
  };
  const handleKeyDown = (index, event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission or any other unwanted behavior
      const { name, value } = event.target;
  
      // Add the new line character at the current caret position
      const newValue = value + "\n";
      
      // Update the experience list with the new value containing the newline
      const newEntries = experinceList.slice();
      newEntries[index][name] = newValue;
      setExperinceList(newEntries);
      setResumeInfo((prevState) => ({
        ...prevState,
        Experience: newEntries,
      }));
    }
  };
  

  const formatJobSummeryWithAi = async (index) => {
    setIsLoading(true);
    try {
      const currnetJobSummery = experinceList[index].workSummery;
      const finalPromptForAI =
        formatWorkSummaryPromptTemplate + "\n" + currnetJobSummery;
      console.log(finalPromptForAI);
      const GeminaiSummeryResult = await GeminaiChatSession.sendMessage(
        finalPromptForAI
      );
      const newEntries = experinceList.slice();
      newEntries[index].workSummery =
        await GeminaiSummeryResult.response.text();
      setExperinceList(newEntries);
      setResumeInfo((prevState) => ({
        ...prevState,
        Experience: newEntries,
      }));
      toast({ description: "Formatted work experience with AI." });
    } catch {
      toast({ description: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = () => {
    setIsLoading(true);
    const sanitizedExperienceList = experinceList.map((experience) => ({
      title: experience.title || "Unknown Title",
      companyName: experience.companyName || "Unknown Company",
      city: experience.city || "Unknown City",
      startDate: experience.startDate || "2000-01-01",
      endDate: experience.endDate || "2000-01-01",
      workSummery: experience.workSummery || "No summary provided",
    }));
    const data = { Experience: sanitizedExperienceList };

    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then((res) => {
        setIsLoading(false);
        toast({ description: "Your experience details have been saved." });
        setResumeInfo((prevState) => ({
          ...prevState,
          Experience: data.Experience,
        }));
      })
      .catch((error) => {
        setIsLoading(false);
        toast({ description: "Failed to save experience. Please try again." });
      });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <h2 className="text-2xl font-bold">Professional Experience</h2>
      </CardHeader>
      <CardContent>
        {experinceList.map((expField, index) => (
          <Card className="mb-6" key={index}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Work Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter Work Title"
                  value={expField.title}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter Company Name"
                  value={expField.companyName}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Enter City"
                  value={expField.city}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={expField.startDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={expField.endDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="workSummary">Work Summary</Label>
                <Textarea
                  id="workSummary"
                  name="workSummery"
                  placeholder="Enter Work Summary"
                  rows={4}
                  value={expField.workSummery}
                  onChange={(event) => handleChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)} // New keydown handler for special cases

                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => formatJobSummeryWithAi(index)}
                  >
                    {isLoading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Format with AI"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={AddNewExperience}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Experience
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={RemoveExperience}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Remove Last Experience
          </Button>
          <Button className="w-full sm:w-auto" onClick={onSave}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfessionalExpForm;
