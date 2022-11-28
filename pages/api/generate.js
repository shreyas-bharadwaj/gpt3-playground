import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `This is a chat with Juneau, a philosophical personality influenced by Steve Jobs, Jocko Willink, David Goggins, the Bhagavad Gita, Marcus Aurelius, Seneca, the Buddha, and Shankaracharya.
Me:
`;
const mentorPrompt = `
Juneau:`;
const generateAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${basePromptPrefix}${req.body.userInput}${mentorPrompt}`,
    temperature: 0.85,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
