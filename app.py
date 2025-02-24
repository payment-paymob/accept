from flask import Flask, request
import requests
import os

app = Flask(__name__)

# احصل على توكن البوت ومعرف الشات من متغيرات البيئة
BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

@app.route("/", methods=["POST"])
def receive_data():
    data = request.form
    name = data.get("name")
    email = data.get("email")
    
    message = f"اسم العميل: {name}\nالبريد الإلكتروني: {email}"
    
    telegram_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    requests.post(telegram_url, data={"chat_id": CHAT_ID, "text": message})

    return "تم إرسال البيانات بنجاح!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
