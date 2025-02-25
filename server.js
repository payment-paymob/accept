const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: "يجب ملء جميع الحقول!" });
    }

    const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.CHAT_ID;
    
    const message = `📩 بيانات جديدة:\n\n👤 الاسم: ${name}\n📞 الهاتف: ${phone}\n📧 البريد: ${email}`;
    const telegramURL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        await axios.post(telegramURL, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        res.json({ message: "تم إرسال البيانات بنجاح!" });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء الإرسال!" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
