import os
import pickle
import numpy as np
from flask import jsonify

# Load the heart disease model
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(working_dir, 'saved_models', 'heart_disease_model.sav')
heart_disease_model = pickle.load(open(model_path, 'rb'))

# Define the function for heart disease prediction
def predict_heart_disease(request):
    try:
        # Expect the request to be JSON
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Required features for the heart disease model
        required_features = [
            'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
            'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
        ]
        
        # Extract and validate input
        user_input = [data.get(feature) for feature in required_features]
        if None in user_input:
            missing_features = [required_features[i] for i, x in enumerate(user_input) if x is None]
            return jsonify({'error': f'Missing required features: {", ".join(missing_features)}'}), 400
        
        # Convert inputs to float
        user_input = [float(x) for x in user_input]

        # Make prediction
        heart_prediction = heart_disease_model.predict([user_input])

        # Convert numpy.int64 to native Python int
        heart_prediction = int(heart_prediction[0])

        # Generate the result
        if heart_prediction == 1:
            message = "Based on the assessment, it appears there is a risk of heart disease. We strongly recommend consulting with a healthcare professional to discuss potential treatment options and lifestyle adjustments for optimal heart health."
        else:
            message = "Your results indicate that you are not at significant risk for heart disease at this time. Continue to maintain a healthy lifestyle, and be sure to attend regular check-ups to keep your heart health in check."

        response = {
            'prediction': heart_prediction,
            'message': message
        }

        return jsonify(response), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error to the console
        return jsonify({'error': 'Internal server error. Please check logs for more details.'}), 500
