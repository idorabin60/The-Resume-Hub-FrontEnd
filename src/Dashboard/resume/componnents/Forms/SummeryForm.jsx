/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import GlobalApi from "../../../../../service/GlobalApi";
import { GeminaiChatSession } from "../../../../../service/GeminaiApi";
import { ResumeInfoParserForPrompt } from "../../../../../service/ResumeInfoParserForPrompt";

function SummeryForm({ enableNavigationButtons }) {
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [linkdinURL, setLinkdinURL] = useState(''); // State for LinkedIn URL input
  const params = useParams();
  const { toast } = useToast();

  const GenerateSummeryFromAI = async () =>{
    setIsLoading(true)
    try{
    const data_for_parsing = ResumeInfoParserForPrompt(resumeInfo);
    console.log(data_for_parsing)
    const GeminaiSummeryResult = await GeminaiChatSession.sendMessage(ResumeInfoParserForPrompt(resumeInfo));
    console.log(GeminaiSummeryResult.response.text());
    setSummery(GeminaiSummeryResult.response.text())

    toast({
      description: "Sumery has been generated usin ai suscseesfully.",
    });
    }
    catch{
      toast({
        description: "Ai genrated has failed, please try agin or contect ido rabin: 052-7062800",
      });
      

    }
    finally{
      setIsLoading(false)

    }

  }

  // Update resumeInfo with the latest summery when summery changes
  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      summery: summery,
    }));
  }, [summery, setResumeInfo]);

  const onSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      summery: summery,
    };
    console.log(data)
    
    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then((res) => {
        console.log(res);
        toast({
          description: "Your Personal Details have been saved.",
        });
        const promptData = ResumeInfoParserForPrompt(resumeInfo);
        console.log(resumeInfo)
        console.log(promptData);
      })
      .catch((err) => {
        console.error(
          "Error during PUT request:",
          err.response ? err.response.data : err.message
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    enableNavigationButtons(true);
  };

  const handleGenerateSummary = async () => {
    if (!linkdinURL) {
      toast({
        description: "Please enter a LinkedIn job URL",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call the backend to extract job details
      const response = await fetch('http://localhost:3001/extract-job-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobURL: linkdinURL }), // Send LinkedIn URL to the backend
      });
      
      const data = await response.json();

      if (data.aboutJobText) {
        setSummery(data.aboutJobText); // Update summery with the extracted job details
        toast({
          description: "Job details extracted successfully!",
        });
      } else {
        toast({
          description: "Failed to extract job details",
        });
      }
    } catch (error) {
      console.error("Error extracting job details:", error);
      toast({
        description: "Failed to extract job details",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-md">
      <h2 className="p-5 shadow-md rounded-lg border-t-2 border-t-gray-300 mt-6 bg-gradient-to-r from-white to-blue-100 text-gray-800 text-xl font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg">
        Summery
        <form onSubmit={onSave} className="mt-4">
          <div className="flex justify-between items-end">
            <label className="text-xs mt-4">Add Summery:</label>
            <Button
              size="sm"
              type="button"
              onClick={GenerateSummeryFromAI} // Call handleGenerateSummary on click
              className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Generate summery that will match a specific job with AI'}
            </Button>
          </div>
          <Textarea
            value={summery}
            required
            className="mt-10"
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-5">
            <label>Enter URL from a LinkedIn job you want your CV to match for</label>
            <Input
              name="linkdinURL"
              placeholder="https://www.linkedin.com/job/sample"
              value={linkdinURL} // Bind input value to state
              onChange={(e) => setLinkdinURL(e.target.value)} // Update LinkedIn URL state
              className="p-3 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full mt-5"
            />
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </h2>
    </div>
  );
}

export default SummeryForm;
