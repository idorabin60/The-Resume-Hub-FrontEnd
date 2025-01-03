export function ResumeInfoParserForPrompt(resumeInfo) {
  const {
    firstName,
    lastName,
    jobTitle,
    address,
    phone,
    email,
    Experience = [], // Matching the case of the field in the data
    Educations = [], // If education is not present, it will default to an empty array
    Skills = [], // Matching the case of the field in the data
    aboutTheJob = "", // Default to an empty string if not present
  } = resumeInfo;

  const experienceSummary = Experience.map(
    (exp) =>
      `• ${exp.title} (${exp.startDate} to ${
        exp.currentlyWorking ? "Present" : exp.endDate
      }): ${exp.workSummery}`
  ).join("\n");

  const educationSummary = Educations.map(
    (edu) =>
      `• ${edu.degree} in ${edu.major} from ${edu.universityName} (${edu.startDate} to ${edu.endDate})`
  ).join("\n");

  const skillsSummary = Skills.map(
    (skill) => `• ${skill.name} (Rating: ${skill.rating}/100)`
  ).join("\n");

  const aboutTheJobText = aboutTheJob
    ? `Please ensure the summary reflects my strong alignment with common industry expectations and required skills, as outlined in the job description below.`
    : "";

  const promptForAI = `
  I would like you to create a professional and impactful 4-6 line summary for my CV. Please focus on highlighting my key strengths, emphasizing my experience, skills, and education, while also showcasing my personal qualities and work ethic. Do not mention any specific company names. ${
    aboutTheJob
      ? "Additionally, ensure the summary reflects my general alignment with the job expectations described below but dont mention the company name or anything related to the company itself."
      : ""
  } Write the summary in a confident and polished tone, as though I am writing it myself. Here is my relevant information:

  Name: ${firstName} ${lastName}
  Job Title: ${jobTitle}
  Address: ${address}
  Phone: ${phone}
  Email: ${email}

  Experience:
  ${experienceSummary || "No experience provided."}

  Education:
  ${educationSummary || "No education provided."}

  Skills:
  ${skillsSummary || "No skills provided."}

  ${aboutTheJobText}
  `;

  console.log(promptForAI);

  return promptForAI;
}
