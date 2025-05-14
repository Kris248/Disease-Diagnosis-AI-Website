import os
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Disease prediction imports
from kidney import predict_kidney_disease
from braintumor import predict_braintumor_disease
from pneumonia import predict_pneumonia_disease
from heart import predict_heart_disease
from diabetes import predict_diabetes
from parkinson import predict_parkinsons_disease

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    history = request.json.get("history", [])

    formatted_messages = [
        {"role": "system", "content": (
            "You are Sylvie, a friendly and helpful medical assistant. "
            "Only answer questions related to health, medicine, fitness, mental health, and nutrition. "
            "Give short, clear responses in a friendly tone using bullet points where helpful. "
            "Always remember previous user messages to answer follow-ups smoothly."
        )}
    ]

    for msg in history:
        role = msg.get("from", "user")
        role = "assistant" if role == "bot" else role
        formatted_messages.append({"role": role, "content": msg.get("text", "")})

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=formatted_messages
        )

        answer = response.choices[0].message.content
        return jsonify({"reply": answer})

    except Exception as e:
        print("Error in /chat:", str(e))
        return jsonify({"reply": "Sorry, something went wrong on the server."})






# @app.route('/chat', methods=['POST'])
# def chat():
#     user_input = request.json.get("message", "").lower()

#     # Dummy logic
#     if "fever" in user_input:
#         reply = "It seems like you have a fever. Stay hydrated and consider taking paracetamol."
#     elif "headache" in user_input:
#         reply = "Headaches can result from stress or dehydration. Try resting and drink water."
#     elif "covid" in user_input:
#         reply = "COVID-19 symptoms may include fever, cough, and fatigue. Consider getting tested."
#     elif "bye" in user_input:
#         reply = "Goodbye! Take care and stay healthy."
#     elif any(word in user_input for word in ["movie", "cricket", "weather", "news"]):
#         reply = "Sorry, I can only help with health-related queries."
#     else:
#         reply = "I'm a health assistant bot. Please ask a health-related question."

#     return jsonify({"reply": reply})








# Define routes for each disease model=
@app.route('/predict-kidney-disease', methods=['POST'])
def kidney_disease_route():
    return predict_kidney_disease(request)

@app.route('/predict-braintumor-disease', methods=['POST'])
def braintumor_disease_route():
    return predict_braintumor_disease(request)

@app.route('/predict-pneumonia-disease', methods=['POST'])
def pneumonia_disease_route():
    return predict_pneumonia_disease(request)

@app.route('/predict-heart-disease', methods=['POST'])
def heart_disease_route():  
    return predict_heart_disease(request)

@app.route('/predict-diabetes-disease', methods=['POST'])
def diabetes_route():
    return predict_diabetes(request)

@app.route('/predict-parkinson-disease', methods=['POST'])
def parkinson_route():
    return predict_parkinsons_disease(request)


if __name__ == '__main__':
    app.run(debug=True)




