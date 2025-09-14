import {useState, useEffect, useRef} from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const AssistantMode =  () => {
  const [enabled, setEnabled] = useState(true);
  const switchRef = useRef(null)
  const [message, setMessage] = useState('');
  const [send, setSend] = useState(true);
  const [chatMessages, setChatMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages')
    return savedMessages ? JSON.parse(savedMessages) : []
  });

  const handleChange = (e) => {
    if (e.target.checked) {
      console.log("Assistant mode enabled");
      setEnabled(true);
    } else {
      console.log("Assistant mode disabled");
      setEnabled(false);
    }
  }

  // Clear the assistant chat messages on load
  useEffect(() => {
    localStorage.clear()
    setChatMessages([])
  }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages]);

  const submitMessage = async () => {
    if (message.trim() === '') return;

    // Can't submit a message whilst the system is still responding to a previous one
    if (send === false) return;

    setSend(false)
    setChatMessages([...chatMessages, { sender: 'user', text: message }])
    const temp = message
    setMessage('')

    try {
      const response = await fetch("http://10.1.1.93:5000/api/action-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: temp
        }),
      });

      if (!response.ok) throw new Error("Failed to send light configuration");

      console.log("Light configured successfully");
    } catch (e) {
      console.error("Error:", e.message);
    }

    setSend(true)
  } 
    
  return (
    <div className="w-[1200px] mx-auto p-6 rounded-2xl shadow-xl mb-10 space-y-6 bg-dark">
      <div className="w-4xl flex justify-center flex-col">
        <div className="flex justify-center mb-5">
          <FormControlLabel control={<Switch inputRef={switchRef} defaultChecked size="large" onChange={handleChange}/>} label="Assisted Mode" sx={{ color: 'white' }} />
        </div>
        {enabled && (
          <div className="flex flex-row bg-light gap-0 p-4 rounded-xl">
            <div className="w-[1000px] min-h-200 rounded-2xl shadow-xl bg-light">
              <div className="flex-grow overflow-y-auto border rounded-xl p-6 bg-gray-100">
                {chatMessages.length === 0 ? (
                  <p className="text-gray-500 italic text-center">🤖 Tell me what you want!</p>
                ) : (
                  <div className="flex flex-col space-y-3">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl max-w-[70%] ${
                          msg.sender === 'user'
                            ? 'bg-blue-500 text-white self-end ml-auto'
                            : 'bg-white text-black self-start mr-auto'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 p-4">
                <textarea
                  value={message}
                  placeholder="Type your message..."
                  className="w-full resize-none overflow-hidden px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={1}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                    setMessage(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      submitMessage()
                    }
                  }} 
                />
                <IconButton
                  onClick={submitMessage}
                >
                  <GraphicEqIcon/>
                </IconButton>
                <IconButton 
                  className={send ? '' : 'bg-gray-400 text-white cursor-not-allowed'}
                  color={send ? 'primary' : 'secondary'}
                  onClick={submitMessage}
                >
                  <SendIcon/>
                </IconButton>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssistantMode;