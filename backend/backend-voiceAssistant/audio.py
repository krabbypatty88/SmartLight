import sounddevice as sd
from scipy.io.wavfile import write
import whisper
import requests
import json

# ------- Configuration ---------------

AUDIO_FILENAME = "command.wav"
RECORD_SECONDS = 5 
SAMPLE_RATE = 16000
LLM_MODEL = "llama3"
OLLAMA_URL = ""
PI_URL = ""

# ------- Helper Functions ------------

def record_audio():
  print(F"🎙️ Recording for, {RECORD_SECONDS}, seconds..." )
  audio = sd.rec(int(RECORD_SECONDS * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1, dtype='int16')
  sd.wait()
  write(AUDIO_FILENAME, SAMPLE_RATE, audio)
  print(f"✅ Saved to {AUDIO_FILENAME}")

def transcribe_audio():
  print("📝 Transcribing...")
  model = whisper.load_model("base")
  result = model.transcribe(AUDIO_FILENAME)
  print(" Intrepreted speech:", result["text"])
  return result["text"]