const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // لتقديم index.html

// متغيرات البيئة
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/send", async (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: "يرجى إدخال جميع البيانات" });
    }

    const telegramMessage = `📩 *رسالة جديدة*\n👤 *الاسم:* ${name}\n💬 *الرسالة:* ${message}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: "Markdown",
        });

        res.json({ message: "تم إرسال البيانات بنجاح إلى تيليجرام!" });
    } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء إرسال البيانات" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
});
