import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import GlobalApi from "../../../../../service/GlobalApi";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// eslint-disable-next-line react/prop-types
function AboutTheJobForm({ enableNavigationButtons }) {
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [aboutTheJob, setAboutTheJob] = useState(resumeInfo?.aboutTheJob || "");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();


  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      aboutTheJob,
    }));
  }, [aboutTheJob, setResumeInfo]);

  const onSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    enableNavigationButtons(false);
    const data = { aboutTheJob };
    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then(() => {
        toast({
          description: "Your about the job data has been saved.",
        });
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <h2 className="text-2xl font-bold">About the job (optional)</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-5">

          <Textarea
            value={aboutTheJob}
            onChange={(e) => setAboutTheJob(e.target.value)}
            className="w-full"
            placeholder="Enter details about the job here..."

          />

          <div className="flex justify-end mt-6">
            <Button type="submit" className="w-full sm:w-auto">
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default AboutTheJobForm ;
