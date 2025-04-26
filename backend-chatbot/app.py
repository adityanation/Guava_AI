import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()

# ✅ Fetch API Key securely
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ✅ Debugging - Check if API Key is loaded
if not GEMINI_API_KEY:
    raise ValueError("⚠️ Error: Missing GEMINI_API_KEY in .env file!")

print(f"🔍 .env file loaded: {bool(GEMINI_API_KEY)}")
print(f"🔑 GEMINI_API_KEY: {GEMINI_API_KEY[:5]}********")  # Hiding full key for security

# ✅ Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# ✅ Configure Google Gemini AI
try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-pro")
except Exception as e:
    print(f"⚠️ Error configuring Google AI: {e}")
    model = None

# ✅ Home Route
@app.route("/", methods=["GET"])
def home():
    return "✅ Flask server is running! Use the /predict endpoint to chat with AI."

# ✅ AI Chatbot Route
@app.route("/predict", methods=["POST"])
def predict():
    if not model:
        return jsonify({"reply": "⚠️ AI Model is not configured properly."}), 500

    try:
        data = request.json
        user_message = data.get("message", "").strip()

        if not user_message:
            return jsonify({"reply": "⚠️ Please enter a message."}), 400

        response = model.generate_content(user_message)
        return jsonify({"reply": response.text})

    except Exception as e:
        print(f"❌ AI Error: {e}")
        return jsonify({"reply": "⚠️ AI chatbot encountered an error."}), 500

# ✅ Run Flask Server
if __name__ == "__main__":
    app.run(port=5001, debug=True)  # Runs on http://127.0.0.1:5000
