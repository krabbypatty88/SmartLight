import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())

app.post(`/query`, async (req, res) => {
  const { message } = req.body
  console.log(message)

  try {
    const response = await fetch(`http://localhost:11434/api/generate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({model: 'llama3', prompt: message, stream: true })
    })

    console.log('Ollama status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama error response:', errorText);
      return res.status(response.status).json({ error: 'LLaMA failed', details: errorText });
    }

    let fullResponse = '';

    for await (const chunk of response.body) {
      const lines = chunk.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            fullResponse += parsed.response;
          }
        } catch (err) {
          console.error('Chunk parse error:', err);
        }
      }
    }

    console.log(fullResponse)

  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Error querying Llama' })
  }
})

app.listen(5000, () => console.log('Server running at http://localhost:5000'))