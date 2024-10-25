import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/certification', async (req, res) => {
    try {
        const userQuery = req.query.q || 'cloud computing';
        const openAiPrompt = `Recommend a certification for someone interested in ${userQuery}.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ "role": "user", "content": openAiPrompt }],
                max_tokens: 100,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Enhanced response structure check with more specific error messages
        if (data && data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
            const messageContent = data.choices[0]?.message?.content;
            if (messageContent) {
                res.json({ suggestions: messageContent.trim() });
            } else {
                console.error("API response is missing 'content' in 'message':", JSON.stringify(data, null, 2));
                res.status(500).json({ error: 'Expected content in API response message is missing' });
            }
        } else {
            console.error("Unexpected API response structure or empty choices array:", JSON.stringify(data, null, 2));
            res.status(500).json({ error: 'Unexpected API response format or empty result' });
        }
    } catch (error) {
        console.error('Error during OpenAI API request:', error.message || error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
