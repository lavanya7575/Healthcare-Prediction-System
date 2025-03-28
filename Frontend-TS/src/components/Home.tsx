import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState(null);
  const [symptomList, setSymptomList] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/symptoms")
      .then((response) => setSymptomList(response.data.symptoms))
      .catch((error) => console.error("Error fetching symptoms:", error));
  }, []);
  
  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        symptoms: symptoms.split(",").map((s) => s.trim()),
      });
      setPrediction(response.data);
    } catch (error:any) {
      console.error("Prediction Error:", error.response?.data || error.message);
    }
  };

  const handleChat = async () => {
    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: chatMessage,
      });
      setChatResponse(response.data.bot_reply);
    } catch (error:any) {
      console.error("Chatbot Error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Health Center</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="http://localhost:5173/" target="_blank">Chatbot</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Form */}
      <div className="container my-4" style={{ background: "black", color: "white", borderRadius: "15px", padding: "40px" }}>
        <h1 className="text-center">Health Center!!!</h1>
        <div className="form-group">
          <label>Select Symptoms:</label>
          <input
            type="text"
            className="form-control"
            list="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Type symptoms like itching, headache, etc."
          />
          <datalist id="symptoms">
            {symptomList.map((symptom, index) => (
              <option key={index} value={symptom}>{symptom}</option>
            ))}
          </datalist>
        </div>
        <button className="btn btn-danger w-100 mt-3" onClick={handlePredict}>Predict</button>
      </div>

      {/* Results */}
      {prediction && (
        <div className="container my-4">
          <h1 className="text-center">Results</h1>
          <div className="alert alert-info">Predicted Disease: {prediction.disease}</div>
          <p><strong>Description:</strong> {prediction.description}</p>
          <p><strong>Precautions:</strong> {prediction.precautions?.join(", ")}</p>
          <p><strong>Medications:</strong> {prediction.medications?.join(", ")}</p>
          <p><strong>Diet:</strong> {prediction.diet?.join(", ")}</p>
          <p><strong>Workout:</strong> {prediction.workout?.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default App;
