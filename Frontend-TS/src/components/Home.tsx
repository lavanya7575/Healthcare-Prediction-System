import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Side: Prediction */}
      <div style={{ flex: 1, padding: "20px", borderRight: "1px solid #ccc" }}>
        {/* Main Form */}
        <div>
          <h1>Health Center!!!</h1>
          <div>
            <label>Select Symptoms:</label>
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
          <button
            onClick={() => {
              setSymptoms("");
              setPrediction(null);
            }}
          >
            Clear
          </button>
          <button onClick={handlePredict}>Predict</button>
        </div>

        {/* Results */}
        {prediction && (
          <div>
            <h1>Results</h1>
            <h1>
              Predicted Disease: <strong>{prediction.disease}</strong>
            </h1>
            <div>
              {/* Buttons on the left */}
              <div>
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
              <div>
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
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Chatbot</h1>
        <div style={{ height: "80%", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
              <p><strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}</p>
            </div>
          ))}
          {isLoading && <p><strong>Bot:</strong> Thinking...</p>}
        </div>
        <form onSubmit={handleChat} style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            style={{ width: "50%", marginRight: "10px" }}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
