import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import logo from "./assets/bot_4712106.png"
const configuration = new Configuration({
  organization:'org-gNGh2t2WYIC9ERDLsocPHEI3',
  apiKey:'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'
});
const openai = new OpenAIApi(configuration);

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0,1e10)

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a EbereGPT. You can help with graphic design tasks",
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
        scrollTo(0,1e10)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <nav id="navBar">
    <div>
      <img
      src={logo}
      alt="logo"
      id="logo"
      />  
    </div>
      <ul>
        <li>Home</li>
        <li>Reserch</li>
        <li>Developers</li>
        <li>Saftey</li>
        <li>Contact</li>
      </ul>
    </nav>
    <main>
      <h1>Lets start our conversation</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="How can I help you?"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
    </>
  );
}

export default App;