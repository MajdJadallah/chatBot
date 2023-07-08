import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
  organization:"org-gNGh2t2WYIC9ERDLsocPHEI3",
  apiKey:"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"
});
const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
});