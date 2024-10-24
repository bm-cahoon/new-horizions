const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to handle OpenAI API requests
app.get('/api/certification', async (req, res) => {
    const userQuery = req.query.q || 'cloud computing';
    const openAiPrompt = `Recommend a certification for someone interested in ${userQuery}.`;

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Securely access the API key from env variables
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: openAiPrompt,
            max_tokens: 100,
        }),
    });

    const data = await response.json();
    res.json({ suggestions: data.choices[0].text.trim() });
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
