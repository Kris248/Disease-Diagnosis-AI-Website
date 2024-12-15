import os
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS


from kidney import predict_kidney_disease
from braintumor import predict_braintumor_disease
from pneumonia import predict_pneumonia_disease
from heart import predict_heart_disease
from diabetes import predict_diabetes
from parkinson import predict_parkinsons_disease


app = Flask(__name__)
CORS(app)

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
