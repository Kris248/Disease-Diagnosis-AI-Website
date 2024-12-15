# kidney.py
import os
import pickle
import numpy as np
from tensorflow.keras.preprocessing import image
from io import BytesIO
from flask import jsonify

# Load the Brain Tumor disease model
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(working_dir, 'saved_models', 'brain_tumor_model.sav')
brain_tumor_model = pickle.load(open(model_path, 'rb'))

# Define the classes for Brain Tumor disease
classes = ['Glioma', 'Meningioma', 'Normal', 'Pituitary']

def predict_braintumor_disease(request):
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
        prediction = brain_tumor_model.predict(x)
        
        # Find the highest confidence prediction
        predicted_confidence = max(prediction[0])
        predicted_class_index = list(prediction[0]).index(predicted_confidence)
        predicted_class = classes[predicted_class_index]
        predicted_percentage = predicted_confidence * 100

        if predicted_class == "Normal" and predicted_percentage >= 80 :
            message = f"Great news! Your brain scan has been assessed with a {predicted_percentage:.2f}% chance of being in {predicted_class} condition. This is a positive sign, and everything looks healthy! Continue to maintain a balanced lifestyle."
        # elif predicted_percentage < 70:
        #     message = "Our analysis wasn't able to confidently detect any tumor-related conditions above 70% accuracy. This is a good sign, but we recommend staying proactive with regular health check-ups to ensure your well-being. Stay positive and take care of yourself! 🌟"
        else:
            message = f"Our analysis shows a {predicted_percentage:.2f}% chance of detecting a {predicted_class} in your brain. Early detection is crucial. Don't panic—consult your healthcare provider for further tests and professional guidance. It's important to address potential issues early on."

        response = {
            'class': predicted_class,
            'confidence': predicted_percentage,
            'message': message
        }

        return jsonify({'prediction': response, 'message': message}), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error to the console
        return jsonify({'error': 'Internal server error. Please check logs for more details.'}), 500
