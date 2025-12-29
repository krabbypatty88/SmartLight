import torch
from transformers import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
import os
import subprocess

# --------------- Server Initialisation -----------

app = Flask(__name__)
CORS(app)

# -------------- OpenAI Whisper Model --------------

whisper = pipeline('automatic-speech-recognition', 
                    model = 'openai/whisper-base', 
                    device = 0, 
                    generate_kwargs={ "task": "translate", "language": "en"})

# ---------------- Helper Functions ---------------


# ---------------- API EndPoints ------------------

@app.route('/api/transcribe', methods=['POST'])
def transcribe():
  return

#-------------- Start Server ---------------------

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5001)
