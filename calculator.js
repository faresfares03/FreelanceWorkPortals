function calculatePrice(event) {
    // منع الصفحة من إعادة التحميل عند إرسال النموذج
    event.preventDefault();

    // جلب القيم المدخلة من المستخدم
    const hourlyRate = parseFloat(document.getElementById("experienceLevel").value);
    const totalHours = parseFloat(document.getElementById("totalHours").value);
    const extraCosts = parseFloat(document.getElementById("extraCosts").value) || 0;

    // المعادلة الحسابية المنطقية لأسعار العمل الحر
    // سعر المشروع = (عدد الساعات × سعر الساعة بناءً على الخبرة) + التكاليف الإضافية للأدوات
    const basePrice = totalHours * hourlyRate;
    const finalPrice = basePrice + extraCosts;

    // عرض حاوية النتيجة
    const resultDiv = document.getElementById("calc-result");
    resultDiv.classList.remove("d-none");

    // طباعة السعر النهائي مع رمز الدولار
    document.getElementById("finalPrice").innerText = `$${finalPrice.toFixed(2)}`;

    // كتابة تفصيل واضح للمستخدم لكيفية احتساب السعر ليتعلم الآلية
    document.getElementById("priceBreakdown").innerHTML = 
        `بناءً على خبرتك، سعر ساعتك العادل هو <strong>$${hourlyRate}</strong>.<br>` +
        `جهد العمل المستغرق ($${hourlyRate} × ${totalHours} ساعة) = $${basePrice}.<br>` +
        `بالإضافة إلى $${extraCosts} تكاليف أدوات ومستلزمات.`;
}