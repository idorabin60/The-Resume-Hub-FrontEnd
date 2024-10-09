export function ResumeInfoParserForPrompt(resumeInfo) {
  const {
    firstName,
    lastName,
    jobTitle,
    address,
    phone,
    email,
    Experience = [], // Matching the case of the field in the data
    education = [], // If education is not present, it will default to an empty array
    Skills = [], // Matching the case of the field in the data
  } = resumeInfo;

  const experienceSummary = Experience.map(
    (exp) =>
      `• ${exp.title} at ${exp.companyName}, ${exp.city}, (${
        exp.startDate
      } to ${exp.currentlyWorking ? "Present" : exp.endDate}) summery:${
        exp.workSummery
      }`
  ).join("\n");

  const educationSummary = education
    .map(
      (edu) =>
        `• ${edu.degree} in ${edu.major} from ${edu.universityName} (${edu.startDate} to ${edu.endDate})`
    )
    .join("\n");

  const skillsSummary = Skills.map(
    (skill) => `• ${skill.name} (Rating: ${skill.rating}/100)`
  ).join("\n");

  const promptForAI = `
  I would like you to create a professional and impactful 4-6 line summary for my CV. Please focus on highlighting my key strengths, emphasizing my experience, skills, and education, while also showcasing my personal qualities and work ethic. Write the summary in a confident and polished tone, as though I am writing it myself. Here is my relevant information:

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
`;

  return promptForAI;
}
