<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نموذج الدفع</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            direction: rtl;
        }
        form {
            display: inline-block;
            text-align: right;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background: #f9f9f9;
        }
        input {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .error {
            border-color: red;
        }
        button {
            background: blue;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <h2>معلومات الدفع</h2>
    <form id="paymentForm">
        <label>رقم البطاقة</label>
        <input type="text" id="cardNumber" maxlength="16" required>

        <label>تاريخ الانتهاء</label>
        <input type="text" id="expiryDate" maxlength="5" placeholder="MM/YY" required>

        <label>رمز الأمان (CVV)</label>
        <input type="text" id="cvv" maxlength="3" required>

        <button type="submit">إرسال</button>
    </form>

    <script>
        document.getElementById("expiryDate").addEventListener("input", function(e) {
            let value = e.target.value.replace(/\D/g, ''); // إزالة أي أحرف غير أرقام
            if (value.length >= 2) {
                e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
            } else {
                e.target.value = value;
            }
        });

        document.getElementById("paymentForm").addEventListener("submit", function(e) {
            e.preventDefault();

            let cardNumber = document.getElementById("cardNumber");
            let expiryDate = document.getElementById("expiryDate");
            let cvv = document.getElementById("cvv");

            let hasError = false;

            if (cardNumber.value.length !== 16) {
                cardNumber.classList.add("error");
                hasError = true;
            } else {
                cardNumber.classList.remove("error");
            }

            if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
                expiryDate.classList.add("error");
                hasError = true;
            } else {
                expiryDate.classList.remove("error");
            }

            if (cvv.value.length !== 3) {
                cvv.classList.add("error");
                hasError = true;
            } else {
                cvv.classList.remove("error");
            }

            if (hasError) {
                alert("يجب ملء جميع الحقول بشكل صحيح!");
                return;
            }

            let formData = {
                cardNumber: cardNumber.value,
                expiryDate: expiryDate.value,
                cvv: cvv.value
            };

            fetch("https://your-server-url.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
            .then(data => alert("تم الإرسال بنجاح!"))
            .catch(error => alert("حدث خطأ أثناء الإرسال!"));
        });
    </script>

</body>
</html>
