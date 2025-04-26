from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os
from werkzeug.utils import secure_filename
from tensorflow.keras.preprocessing import image  # Correct preprocessing

app = Flask(__name__)
CORS(app)  # Enable CORS for React communication

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load the trained model
try:
    model = tf.keras.models.load_model("model/Guava_Disease_Model_final.h5")
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Get class order dynamically from training
DISEASE_CLASSES = ["Anthracnose", "Fruit Fly", "Healthy"]  # Manually defined (must match training)
CLASS_ORDER = {0: "Anthracnose", 1: "Fruit Fly", 2: "Healthy"}  # Adjust if needed

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask server is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    try:
        # Ensure same preprocessing as Colab
        input_size = model.input_shape[1:3]  # Get (height, width)

        # Load image using TensorFlow's image module (same as training)
        img = image.load_img(filepath, target_size=input_size)
        img = image.img_to_array(img)  # Convert to NumPy array
        img = img / 255.0  # Normalize
        img = np.expand_dims(img, axis=0)  # Add batch dimension

        # Predict
        predictions = model.predict(img)
        predicted_class = np.argmax(predictions)
        confidence = float(np.max(predictions))

        # Get the correct class name dynamically
        disease_name = CLASS_ORDER[predicted_class]

        print(f"✅ Prediction: {disease_name} ({confidence * 100:.2f}%)")

        return jsonify({
            "image_url": f"http://127.0.0.1:5000/uploads/{filename}",
            "disease": disease_name,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return jsonify({"error": "Error processing the image"}), 500

# Route to serve uploaded images
@app.route("/uploads/<filename>")
def get_uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

if __name__ == "__main__":
    app.run(debug=True)
