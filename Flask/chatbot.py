import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import logging


# Configure logging
logging.basicConfig(level=logging.DEBUG)

load_dotenv()
API_KEY = os.getenv("api_key")  # Ensure "api_key" is in your .env file
genai.configure(api_key=API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,  # Adjust as needed
    "response_mime_type": "text/plain",  # Important for text responses
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",  # Or your specific Gemini model name
    generation_config=generation_config,
)
chat_histories = {}
def chat():
    try:
        user_id = request.json.get('userId')
        user_message = request.json.get('message')

        if user_id not in chat_histories:
            chat_histories[user_id] = []

        chat_history = chat_histories[user_id]

        system_instruction = """You are a healthcare chatbot. 

1. For any greetings (e.g., hello, hi, good morning), reply: "Hello, welcome to Medibot. Please mention your symptom."

2. If the user directly mentions a disease or problem (e.g., "I have a headache," "I think I have the flu"), provide a brief, one-liner description of the disease, its common causes, and basic precautions.  Keep the response minimalist (one line if possible).  Do not ask questions in this case.

3. For symptoms (e.g., "I have a runny nose and cough"), reply: "Okay, I understand you're experiencing <symptom>. I wish to ask you some questions." Then, ask 5 yes/no questions *one by one, separately*, based on the symptoms. After the user answers the questions, provide a possible diagnosis.

4. All replies should be simple and minimalist (one line if possible).

5. if you find any spelling mistake (e.g., alzimers), reply "Do you mean alzheimer"

6. After the 5 questions asked to the user provide a 2 line description of the disease, causes , precautions and medications.

7. If the input is something other than a greeting, symptom, or disease, reply: "Sorry, I don't understand." """

        prompt = f"""{system_instruction}\n\nChat History:\n{format_chat_history(chat_history)}\nUser: {user_message}"""

        response = model.generate_content([prompt])

        bot_reply = response.text

        chat_history.append({"sender": "user", "text": user_message})
        chat_history.append({"sender": "bot", "text": bot_reply})
        # VERY IMPORTANT: Update the history
        chat_histories[user_id] = chat_history

        return jsonify({'bot_reply': bot_reply})  # Valid JSON

    except Exception as e:
        logging.exception("An error occurred:")  # Log the FULL traceback
        return jsonify({'error': str(e)}), 500  # Return JSON error


def format_chat_history(history):
    formatted = ""
    for message in history:
        formatted += f"{message['sender'].capitalize()}: {message['text']}\n"
    return formatted
