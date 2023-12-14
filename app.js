const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // הוסף תמיכה ב-CORS
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
    try{
    console.log("hhhhhhh") // משהו שתרצה לשלוח חזרה לריאקט
    const data = "llll";
    console.log(data)
    res.json(data);
    }
    catch(error){
        res.status(404).json("error")
    }
   
});

const apiKey = 'YOUR_OPENAI_API_KEY';

// פונקציה ליצירת בקשה ל-API של OpenAI
async function generateGPTResponse(prompt, temperature = 0.7) {
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    const data = {
        prompt,
        temperature,
        max_tokens: 150,
    };

    try {
        const response = await axios.post(apiUrl, data, { headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating GPT response:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// // ניתוב לניסיונות יצירת חיבור עם OpenAI
app.post('/generate', async (req, res) => {
    const { prompt, temperature } = req.body;

    try {
        const response = await generateGPTResponse(prompt, temperature);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // פונקציות טסט
// function testGenerateGPTResponse() {
//     const prompt = "כתוב לי ברכה ליום הולדת לגיל 4 באווירה מצחיקה באורך קצר";
//     generateGPTResponse(prompt)
//         .then(response => console.log('GPT Response:', response))
//         .catch(error => console.eHellorror('Error:', error));
// }

// קריאה לפונקציות טסט
// testGenerateGPTResponse();

// התחלת השרת
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});