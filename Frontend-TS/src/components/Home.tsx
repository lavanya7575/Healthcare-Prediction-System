import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../styles/Home.css";

const App = () => {
  const [symptoms, setSymptoms] = useState("");
  interface Prediction {
    disease: string;
    description: string;
    precautions: string;
    medications?: string[];
    diet?: string[];
    workout?: string[];
  }

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [symptomList, setSymptomList] = useState<string[]>([]);
  const [activeDetail, setActiveDetail] = useState("");

  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState(null);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/symptoms")
      .then((response) => setSymptomList(response.data.symptoms))
      .catch((error) => console.error("Error fetching symptoms:", error));

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      setUserId(newUserId);
      localStorage.setItem("userId", newUserId);
    }
  }, []);

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:5000/predict/api", {
        symptoms: symptoms.split(",").map((s) => s.trim()),
      });
      setPrediction(response.data);
    } catch (error: any) {
      console.error("Prediction Error:", error.response?.data || error.message);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (chatMessage.trim() === "") return;

    setMessages([...messages, { text: chatMessage, sender: "user" }]);
    setChatMessage("");

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: chatMessage,
        userId: userId,
      });

      setMessages([
        ...messages,
        { text: chatMessage, sender: "user" },
        { text: response.data.bot_reply, sender: "bot" },
      ]);
    } catch (error: any) {
      console.error("Chatbot Error:", error.response?.data || error.message);
      setMessages([
        ...messages,
        { text: chatMessage, sender: "user" },
        { text: "Error: " + error.message, sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div >

    <div className="app-container">
      {/* Left Side: Prediction */}
      <div className="prediction-section">
        {/* Main Form */}
        <div>
          <h1>SmartCare</h1>
          <div className="symptom-input">
            <label>Select Symptoms:</label><br></br><br></br>
            <input
              type="text"
              list="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Type symptoms like itching, headache, etc."
            />
            <datalist id="symptoms">
              {symptomList.map((symptom, index) => (
                <option key={index} value={symptom.trim().replace(/_/g, " ")}>
                  {symptom.trim().replace(/_/g, " ")}
                </option>
              ))}
            </datalist>
          </div>
          <div className="group">
            <button className="clear-button"
              onClick={() => {
                setSymptoms("");
                setPrediction(null);
              }}
            >
              Clear
            </button>
            <button className="predict-button"
            onClick={handlePredict} >Predict</button>
          </div>
        </div>

        

        {/* Results */}
        {prediction && (
          <div className="results-container">
            <h1>Results</h1>
            <h1 className="disease-name">
              Predicted Disease: <strong>{prediction.disease}</strong>
            </h1>
            <div>
              {/* Buttons on the left */}
              <div className="detail-buttons">
                <button onClick={() => setActiveDetail("description")}>
                  Description
                </button>
                <button onClick={() => setActiveDetail("precautions")}>
                  Precautions
                </button>
                <button onClick={() => setActiveDetail("medications")}>
                  Medications
                </button>
                <button onClick={() => setActiveDetail("diet")}>Diet</button>
                <button onClick={() => setActiveDetail("workout")}>
                  Workout
                </button>
              </div>

              {/* Details on the right */}
              <div className="detail-content">
                {activeDetail === "description" && (
                  <p>
                    <strong>Description:</strong> {prediction.description}
                  </p>
                )}
                {activeDetail === "precautions" && (
                  <p>
                    <strong>Precautions:</strong> {prediction.precautions}
                  </p>
                )}
                {activeDetail === "medications" && (
                  <p>
                    <strong>Medications:</strong> {prediction.medications}
                  </p>
                )}
                {activeDetail === "diet" && (
                  <p>
                    <strong>Diet:</strong> {prediction.diet}
                  </p>
                )}
                {activeDetail === "workout" && (
                  <p>
                    <strong>Workout:</strong> {prediction.workout}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Chatbot */}
      <div className="chatbot-section">
        <h1>Medibot</h1>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <p><strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}</p>
            </div>
          ))}
          {isLoading && <p className="loading-message"><strong>Bot:</strong> Thinking...</p>}
        </div>
        <form onSubmit={handleChat} className="chat-form">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default App;