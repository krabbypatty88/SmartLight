import {useRef, useState } from "react";
import IconButton from '@mui/material/IconButton';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const VoiceRecordButton = ({ onTranscript }) => {
  const mediaRecorder = useRef(null);
  const mediaStream = useRef(null);
  const chunks = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Idle");

  const startRecording = async () => {
    setIsRecording(true);
    setStatus("Requesting microphone...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;

      const mr = new MediaRecorder(stream);
      mediaRecorder.current = mr;
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      }

      // Once audio recording is finished
      mr.onstop = async () => {
        setIsRecording(false);
        setStatus("Preparing audio...");

        const mime = mr.mimeType || "audio/webm";
        const blob = new Blob(chunks.current, { type: mime });
        chunks.current = [];

        try {
          setStatus("Transcribing...");
          const form = new FormData();

          const filename = mime.includes("ogg") ? "command.ogg" : "command.webm";
          form.append("audio", blob, filename);

          const res = await fetch("http://10.1.1.109:5001/api/transcribe", {
            method: "POST",
            body: form,
          });

          if (!res.ok) {
            throw new Error(`Transcribe failed: ${res.status}`);
          }

          const data = await res.json();
          const text = (data.text ?? "").trim();

          setStatus(text ? "Done" : "No speech detected");

          onTranscript?.(text);
        } catch (error) {
          console.error(error);
          setStatus("Error transcribing");
        } finally {
          mediaStream.current?.getTracks()?.forEach((t) => t.stop());
          mediaStream.current = null;
        }
      };
      mr.start()
    } catch(error) {
      console.log("Error: ", error);
      setStatus("Device error");
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaStream.current.getTracks().forEach(track => track.stop());
    }
  }

  const toggle = async () => {
    if (isRecording) stopRecording();
    else await startRecording();
  }

  return (
    <IconButton onClick={toggle}>
      <GraphicEqIcon
        className={isRecording ? "animate-pulse text-red-500" : "text-gray-500"}
      />
    </IconButton>
  )
}

export default VoiceRecordButton;