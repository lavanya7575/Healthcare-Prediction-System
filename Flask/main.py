import os
import logging
import numpy as np
import pandas as pd
import pickle
import google.generativeai as genai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
# Enable CORS for all routes

# Load environment variables
load_dotenv()
API_KEY = os.getenv("API_KEY")
genai.configure(api_key=API_KEY)

# Configure Gemini AI
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    generation_config=generation_config,
)

# Load disease prediction datasets
# D:/Karthikyan/SECRET/Project Phase II/v1.0/Flask/dataset/symtoms_df.csv
symptoms_df = pd.read_csv("dataset/symtoms_df.csv")
description = pd.read_csv("dataset/description.csv")
precautions = pd.read_csv("dataset/precautions_df.csv")
workout = pd.read_csv("dataset/workout_df.csv")
medications = pd.read_csv("dataset/medications.csv")
diets = pd.read_csv("dataset/diets.csv")

# Load ML model
svc = pickle.load(open("model/svc.pkl", "rb"))

# Extract unique symptoms
symptom_columns = [col for col in symptoms_df.columns if "Symptom" in col]
symptoms_set = set()
for col in symptom_columns:
    symptoms_set.update(symptoms_df[col].dropna().unique())
symptoms_list = sorted(symptoms_set)

symptoms_dict = {'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71,
                 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131}

diseases_list = {15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis', 14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ', 17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine', 7: 'Cervical spondylosis',
                 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice', 29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A', 19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia', 13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins', 26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis', 5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo', 2: 'Acne', 38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'}

# Fetch symptoms API


@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify({"symptoms": symptoms_list})

# Predict Disease API


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        symptoms = data.get("symptoms")

        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        input_vector = np.zeros(len(symptoms_dict))
        for symptom in symptoms:
            if symptom in symptoms_dict:
                input_vector[symptoms_dict[symptom]] = 1
            else:
                return jsonify({"error": f"Invalid symptom: {symptom}"}), 400

        input_vector = input_vector.reshape(1, -1)
        predicted_disease = diseases_list[svc.predict(input_vector)[0]]

        desc = description[description["Disease"] ==
                           predicted_disease]["Description"].values
        pre = precautions[precautions["Disease"]
                          == predicted_disease].values.tolist()
        med = medications[medications["Disease"] ==
                          predicted_disease]["Medication"].values.tolist()
        diet = diets[diets["Disease"] ==
                     predicted_disease]["Diet"].values.tolist()
        wrkout = workout[workout["disease"] ==
                         predicted_disease]["workout"].values.tolist()

        response = {
            "disease": predicted_disease,
            "description": desc.tolist(),
            "precautions": pre,
            "medications": med,
            "diet": diet,
            "workout": wrkout,
        }
        return jsonify(response)
    except Exception as e:
        logging.exception("Error in prediction")
        return jsonify({"error": str(e)}), 500

# Chatbot API


@app.route('/predict/api', methods=['POST'])
def predictApi():
    try:
        data = request.json
        symptoms = data.get("symptoms")

        if not data:
            return jsonify({"error": "No symptoms provided"}), 400

        # Prepare the input prompt for the Gemini API
        symptoms_str = ", ".join(symptoms)
        prompt = f"Given the symptoms: {symptoms}, predict the most likely disease. Give the answer in the expected format \
            only the Name of the most likely disease, \
            Description of the disease in brief only with key words \
            Precautions to be taken in brief with key words comma separated,\
            Medications to be taken in single line comma separated (Add 'doctor's advise preferred' at the last in brackets),\
            Diet to be followed in brief with key words comma separated,\
            Workout to be performed in brief with key words comma separated. \
            give only in semicolon(;) separated and in a single line."

        # Use the Gemini API to generate a response
        response = model.generate_content([prompt])
        print(response.text)
        # Parse the response from Gemini API
        predicted_disease = response.text.split(';')

        # Fetch additional details about the disease
        # desc = description[description["Disease"] == predicted_disease]["Description"].values
        # pre = precautions[precautions["Disease"] == predicted_disease].values.tolist()
        # med = medications[medications["Disease"] == predicted_disease]["Medication"].values.tolist()
        # diet = diets[diets["Disease"] == predicted_disease]["Diet"].values.tolist()
        # wrkout = workout[workout["disease"] == predicted_disease]["workout"].values.tolist()

        desc = predicted_disease[1]
        pre = predicted_disease[2]
        med = predicted_disease[3]
        diet = predicted_disease[4]
        wrkout = predicted_disease[5]

        # Build the response object
        response_data = {
            "disease": predicted_disease[0],
            "description": desc,
            "precautions": pre,
            "medications": med,
            "diet": diet,
            "workout": wrkout,
        }
        return jsonify(response_data)
    except Exception as e:
        logging.exception("Error in prediction")
        return jsonify({"error": str(e)}), 500

chat_histories = {}
@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_id = request.json.get('userId')
        user_message = request.json.get('message')

        if user_id not in chat_histories:
            chat_histories[user_id] = []

        chat_history = chat_histories[user_id]

        system_instruction = """You are a healthcare chatbot.

1. For any greetings (e.g., hello, hi, good morning), reply: "Hello, welcome to Medibot. Please mention your symptom."

2. If the user directly mentions a disease or problem (e.g., "I have a headache," "I think I have the flu"), provide a brief, one-liner description of the disease, its common causes, and basic precautions. Keep the response minimalist (one line if possible). Do not ask questions in this case.

3. For symptoms (e.g., "I have a runny nose and cough"), reply: "Okay, I understand you're experiencing <symptom>. I wish to ask you some questions." Then, ask 5 yes/no questions *one by one, separately*, based on the symptoms. After the user answers the questions, provide a possible diagnosis.

4. All replies should be simple and minimalist (one line if possible).

5. If you find any spelling mistake (e.g., alzimers), reply "Do you mean alzheimer?"

6. After the 5 questions asked to the user, provide a 2-line description of the disease, causes, precautions, and medications.

7. If the input is something other than a greeting, symptom, or disease, reply: "Sorry, I don't understand." """

        prompt = f"""{system_instruction}\n\nChat History:\n{format_chat_history(chat_history)}\nUser: {user_message}"""

        response = model.generate_content([prompt])

        bot_reply = response.text.strip()

        chat_history.append({"sender": "user", "text": user_message})
        chat_history.append({"sender": "bot", "text": bot_reply})
        chat_histories[user_id] = chat_history  # Update the history

        return jsonify({'bot_reply': bot_reply})  # Return valid JSON

    except Exception as e:
        logging.exception("An error occurred:")  # Log the full traceback
        return jsonify({'error': str(e)}), 500  # Return JSON error


def format_chat_history(history):
    formatted = ""
    for message in history:
        formatted += f"{message['sender'].capitalize()}: {message['text']}\n"
    return formatted


if __name__ == "__main__":
    app.run(debug=True, port=5000)
