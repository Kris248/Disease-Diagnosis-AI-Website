# kidney.py

import os
import pickle
import numpy as np
from tensorflow.keras.preprocessing import image
from io import BytesIO
from flask import jsonify

# Load the pneumonia disease model
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(working_dir, 'saved_models', 'chest_xray_model.sav')
pneumonia_disease_model = pickle.load(open(model_path, 'rb'))

# Define the classes for kidney disease
classes = ['Bacterial', 'Normal', 'Viral']

def predict_pneumonia_disease(request):
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Convert the file to a BytesIO object
        img_bytes = BytesIO(file.read())
        
        # Load and preprocess the image
        img = image.load_img(img_bytes, target_size=(150, 150))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x /= 255.0

        # Make prediction
        prediction = pneumonia_disease_model.predict(x)
        
        # Find the highest confidence prediction
        predicted_confidence = max(prediction[0])
        predicted_class_index = list(prediction[0]).index(predicted_confidence)
        predicted_class = classes[predicted_class_index]
        predicted_percentage = predicted_confidence * 100

        if predicted_class == "Normal" and predicted_percentage >= 80 :
            message = f"Great news! Your lungs have been assessed with a {predicted_percentage:.2f}% chance of being in {predicted_class} condition. Your lungs appear to be healthy. Keep up the good work in maintaining your respiratory health!"
        # elif predicted_percentage < 80:
        #     message = "Our analysis couldn't confidently detect any pneumonia-related conditions above 80% accuracy. This is a good sign! However, it's always a good idea to stay aware of your symptoms and continue regular check-ups."
        else:
            message = f"Our analysis shows a {predicted_percentage:.2f}% chance of detecting {predicted_class}   pneumonia in your lungs. Don't worry, early detection is key to proper treatment. We recommend seeing your healthcare provider for further evaluation and necessary treatment."

        response = {
            'class': predicted_class,
            'confidence': predicted_percentage,
            'message': message
        }

        return jsonify({'prediction': response, 'message': message}), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error to the console
        return jsonify({'error': 'Internal server error. Please check logs for more details.'}), 500
