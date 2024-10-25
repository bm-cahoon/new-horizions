const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with ChatGPT API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
