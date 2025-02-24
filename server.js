const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;
    const text = `📩 *رسالة جديدة:*\n\n👤 *الاسم:* ${name}\n📧 *الإيميل:* ${email}\n📝 *الرسالة:* ${message}`;

    try {
        await axios.post(TELEGRAM_API, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'Markdown'
        });
        res.json({ message: "تم الإرسال بنجاح!" });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء الإرسال!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
