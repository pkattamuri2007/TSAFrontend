import { config } from "dotenv";
import OpenAI from "openai"; 
export const chatGptCall = (finalDiseases, setIsLoading, setDescription) =>{
    config();
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true, // This is also the default, can be omitted
});
    console.log("hello");
    var tempDesc = [];
    setIsLoading(true);
    console.log(finalDiseases.length > 0);
    if (finalDiseases.length > 0) {
      const asyncLoop = async () => {
        for (let i = 0; i < finalDiseases.length; i++) {
        
          var chatInput =
            "Write a brief description on the disease " + finalDiseases[i][0] + ". Explain shortly how the given symptoms relate to the disease, and give other symptoms that they should look for with this disease. Write all this in 3 sentences.";
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: chatInput }],
          });

          console.log(response.choices[0].message.content);
          tempDesc.push(response.choices[0].message.content);
          
        }
        setDescription(tempDesc);
        setIsLoading(false);
      };
      console.log('hi');

      asyncLoop();
      console.log('hello')
      
    }
  }