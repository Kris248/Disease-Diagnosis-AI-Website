import os
import pickle
import numpy as np
from flask import jsonify

# Load the Parkinson's disease model
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(working_dir, 'saved_models', 'parkinsons_model.sav')
parkinsons_model = pickle.load(open(model_path, 'rb'))

# Define the function for Parkinson's disease prediction
def predict_parkinsons_disease(request):
    try:
        # Expect the request to be JSON
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Required features for the Parkinson's disease model
        required_features = [
            'MDVP:Fo(Hz)', 'MDVP:Fhi(Hz)', 'MDVP:Flo(Hz)', 'MDVP:Jitter(%)', 
            'MDVP:Jitter(Abs)', 'MDVP:RAP', 'MDVP:PPQ', 'Jitter:DDP', 
            'MDVP:Shimmer', 'MDVP:Shimmer(dB)', 'Shimmer:APQ3', 'Shimmer:APQ5', 
            'MDVP:APQ', 'Shimmer:DDA', 'NHR', 'HNR', 'RPDE', 'DFA', 
            'spread1', 'spread2', 'D2', 'PPE'
        ]
        
        # Extract and validate input
        user_input = [data.get(feature) for feature in required_features]
        if None in user_input:
            missing_features = [required_features[i] for i, x in enumerate(user_input) if x is None]
            return jsonify({'error': f'Missing required features: {", ".join(missing_features)}'}), 400
        
        # Convert inputs to float
        user_input = [float(x) for x in user_input]

        # Make prediction
        parkinsons_prediction = parkinsons_model.predict([user_input])

        # Convert numpy.int64 to native Python int
        parkinsons_prediction = int(parkinsons_prediction[0])

        # Generate the result
        if parkinsons_prediction == 1:
            message = "The assessment indicates a risk of Parkinson's disease. We recommend consulting a healthcare professional for further evaluation and treatment options."
        else:
            message = "The results suggest that there is no significant risk of Parkinson's disease at this time. Maintain a healthy lifestyle and consult a healthcare professional for regular check-ups."

        response = {
            'prediction': parkinsons_prediction,
            'message': message
        }

        return jsonify(response), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error to the console
        return jsonify({'error': 'Internal server error. Please check logs for more details.'}), 500
