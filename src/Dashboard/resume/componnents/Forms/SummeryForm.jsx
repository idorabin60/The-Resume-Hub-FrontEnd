import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import GlobalApi from "../../../../../service/GlobalApi";
import { GeminaiChatSession } from "../../../../../service/GeminaiApi";
import { ResumeInfoParserForPrompt } from "../../../../../service/ResumeInfoParserForPrompt";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// eslint-disable-next-line react/prop-types
function SummeryForm({ enableNavigationButtons }) {
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || "");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();

  const GenerateSummeryFromAI = async () => {
    setIsLoading(true);
    try {
      const data_for_parsing = ResumeInfoParserForPrompt(resumeInfo);
      const GeminaiSummeryResult = await GeminaiChatSession.sendMessage(
        data_for_parsing
      );
      setSummery(GeminaiSummeryResult.response.text());
      toast({
        description: "Summary has been generated successfully using AI.",
      });
    } catch {
      toast({
        description:
          "AI generation failed. Please try again or contact Ido Rabin at 052-7062800.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      summery,
    }));
  }, [summery, setResumeInfo]);

  const onSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    enableNavigationButtons(false);
    const data = { summery };
    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then(() => {
        toast({
          description: "Your summary has been saved.",
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
        <h2 className="text-2xl font-bold">Summary</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-5">
          <div className="flex justify-between items-center">
            <label className="text-gray-800 font-semibold">Add Summary:</label>
            <Button
              size="sm"
              type="button"
              onClick={GenerateSummeryFromAI}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Generate summary with AI"
              )}
            </Button>
          </div>

          <Textarea
            value={summery}
            required
            onChange={(e) => setSummery(e.target.value)}
            className="w-full"
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

export default SummeryForm;
