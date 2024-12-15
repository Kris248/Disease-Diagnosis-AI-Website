import os
import pickle
import numpy as np
from flask import jsonify

# Load the diabetes model
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(working_dir, 'saved_models', 'diabetes_model.sav')
diabetes_model = pickle.load(open(model_path, 'rb'))

# Define the function for diabetes prediction
def predict_diabetes(request):
    try:
        # Expect the request to be JSON
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Required features for the diabetes model
        required_features = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin',
            'BMI', 'DiabetesPedigreeFunction', 'Age'
        ]
        
        # Extract and validate input
        user_input = [data.get(feature) for feature in required_features]
        if None in user_input:
            missing_features = [required_features[i] for i, x in enumerate(user_input) if x is None]
            return jsonify({'error': f'Missing required features: {", ".join(missing_features)}'}), 400
        
        # Convert inputs to float and check for empty strings
        try:
            user_input = [float(x) for x in user_input if x != '']
        except ValueError:
            return jsonify({'error': 'Invalid input: All fields must be numeric.'}), 400

        # Make prediction
        diabetes_prediction = diabetes_model.predict([user_input])[0]
        
        # Convert numpy.int64 to native Python int
        diabetes_prediction = int(diabetes_prediction)

        # Generate the result
        if diabetes_prediction == 1:
            return jsonify({
                'prediction': 1,
                'message': "The results indicate a high likelihood of diabetes. Consult a healthcare professional for guidance and focus on a healthy diet, exercise, and regular monitoring."
            }), 200
        else:
            return jsonify({
                'prediction': 0,
                'message': "You show no signs of diabetes. Keep prioritizing a balanced diet, regular exercise, and routine health checkups to stay on track."
            }), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error to the console
        return jsonify({'error': 'Internal server error. Please check logs for more details.'}), 500
