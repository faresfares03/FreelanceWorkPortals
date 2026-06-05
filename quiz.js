// مصفوفة الأسئلة والأجوبة مع تحديد "النقاط" لكل مجال
const quizData = [
    {
        question: "1. ما هو أكثر نشاط تستمتع بالقيام به أثناء وقت فراغك؟",
        answers: [
            { text: "حل الألغاز، الألعاب المنطقية، أو تفكيك الأشياء وفهم عملها.", score: "programming" },
            { text: "الرسم، تنسيق الألوان، وتعديل الصور أو الفيديوهات.", score: "design" },
            { text: "كتابة الخواطر، القصص، أو التعبير عن أفكاري بالكلمات.", score: "content" },
            // { text: "إقناع أصدقائي بأفكاري، والبحث عن أحدث صيحات "التريند", score: "marketing" }
        ]
    },
    {
        question: "2. إذا طُلب منك المساهمة في مشروع بناء موقع إلكتروني، ماذا تختار؟",
        answers: [
            { text: "كتابة الأكواد البرمجية وبناء لوحة التحكم والأنظمة التكنولوجية.", score: "programming" },
            { text: "تصميم واجهة الموقع واختيار الخطوط والألوان الجذابة.", score: "design" },
            { text: "تجهيز وتحليل الكلمات المفتاحية لكي يظهر الموقع أولاً في جوجل.", score: "seo" },
            { text: "تسجيل مقطع صوتي دعائي احترافي كواجهة ترحيبية للموقع.", score: "voiceover" }
        ]
    },
    {
        question: "3. ما هي بيئة العمل أو نوع المهام التي تشعر أنها تمثلك أكثر؟",
        answers: [
            { text: "التركيز العالي والجلوس طويلاً لبناء حلول تقنية معقدة.", score: "programming" },
            { text: "التفكير الإبداعي البصري والابتكار الفني المستمر.", score: "design" },
            { text: "القراءة والبحث العميق لصياغة مقالات ونصوص ممتعة.", score: "content" },
            { text: "تحليل البيانات والأرقام لمعرفة سلوك المشترين وكيفية جذبهم.", score: "marketing" }
        ]
    },
    {
        question: "4. عندما تشاهد إعلاناً تجارياً ناجحاً، ما الذي يلفت انتباهك أولاً؟",
        answers: [
            { text: "الفكرة الاستراتيجية وكيف استطاع الإعلان إقناع الجمهور بالشراء.", score: "marketing" },
            { text: "نبرة صوت المعلق والأداء الصوتي الاحترافي في الخلفية.", score: "voiceover" },
            { text: "جمال الصورة، الإخراج البصري، وتناسق الجرافيكس.", score: "design" },
            { text: "طريقة صياغة النصوص والشعارات المكتوبة (Slogans).", score: "content" }
        ]
    }
];

// تفاصيل النتائج بناءً على التحليل
const resultsData = {
    programming: { title: "البرمجة والتطوير 💻", desc: "لديك عقلية تحليلية ممتازة وتحب حل المشكلات المعقدة وتفكيك الألغاز. البرمجة هي عالمك المثالي حيث يمكنك تحويل المنطق إلى برمجيات ذكية." },
    design: { title: "التصميم الرقمي والفنون 🎯", desc: "أنت شخص بصري ومبدع بالفطرة، تهتم بالتفاصيل وتملك حساً فنياً عالياً في تنسيق الألوان والمساحات. التصميم واجهات المستخدم أو الجرافيك هو طريقك." },
    seo: { title: "تحسين محركات البحث (SEO) 🔍", desc: "تحب التحدي والذكاء الرقمي المشترك بين التقنية والمحتوى. لديك فضول لمعرفة كيف تفكر الأنظمة (مثل جوجل) وكيف توجه الجماهير بشكل طبيعي." },
    marketing: { title: "التسويق الرقمي وبناء المشاريع 🌟", desc: "أنت شخص استراتيجي، تفهم سيكولوجية الناس وتملك مهارات إقناع عالية وتجذبك الأرقام والنتائج. عالم التجارة الإلكترونية والتسويق بانتظارك." },
    content: { title: "صناعة وكتابة المحتوى 📝", desc: "الكلمات هي قوتك الخارقة! تملك القدرة على صياغة أفكار جذابة والبحث بعمق للتعبير بأسلوب بليغ ومقنع. صناعة المحتوى هي شغفك الحقيقي." },
    voiceover: { title: "التعليق الصوتي والأداء الإذاعي 🎙️", desc: "تملك كاريزما صوتية أو تقديراً كبيراً لقوة النبرات والأداء السمعي. يمكنك تحويل النصوص الجافة إلى مشاعر حية تؤثر في المستمعين." }
};

let currentQuestionIndex = 0;
let scores = { programming: 0, design: 0, seo: 0, marketing: 0, content: 0, voiceover: 0 };

function startQuiz() {
    document.getElementById("start-view").classList.add("d-none");
    document.getElementById("quiz-view").classList.remove("d-none");
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById("question-text").innerText = currentQuestion.question;
    
    // تحديث شريط التقدم (Progress Bar)
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.getElementById("quiz-progress").style.width = `${progressPercent}%`;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "answer-btn");
        button.onclick = () => selectAnswer(answer.score);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(scoreKey) {
    scores[scoreKey] += 1; // إضافة نقطة للمجال المختار
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-view").classList.add("d-none");
    document.getElementById("result-view").classList.remove("d-none");

    // معرفة المجال الحائز على أعلى النقاط
    let highestScoreKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    // عرض النتيجة للمستخدم
    const result = resultsData[highestScoreKey];
    document.getElementById("result-title").innerText = result.title;
    document.getElementById("result-desc").innerText = result.desc;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    scores = { programming: 0, design: 0, seo: 0, marketing: 0, content: 0, voiceover: 0 };
    document.getElementById("result-view").classList.add("d-none");
    document.getElementById("start-view").classList.remove("d-none");
}

function updateProgress() {
    // جلب جميع خانات الاختيار داخل خارطة الطريق
    const checkboxes = document.querySelectorAll('.roadmap-checkbox');
    const totalSteps = checkboxes.length;
    
    // حساب عدد الخانات التي تم تفعيلها (وضع علامة صح عليها)
    let checkedCount = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });
    
    // حساب النسبة المئوية للتقدم
    const progressPercent = Math.round((checkedCount / totalSteps) * 100);
    
    // تحديث النص وشريط التقدم في واجهة المستخدم
    document.getElementById('roadmap-progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('roadmap-progress-text').innerText = `${progressPercent}%`;
}

function postQuestion(event) {
    // منع الصفحة من تحديث نفسها
    event.preventDefault();

    // جلب قيم المدخلات
    const name = document.getElementById("userName").value.trim();
    const tag = document.getElementById("questionTitle").value.trim();
    const body = document.getElementById("questionBody").value.trim();

    // بناء الهيكل البرمجي للسؤال الجديد
    const questionPost = document.createElement("div");
    questionPost.classList.add("question-post", "p-3", "mb-2", "bg-white", "border", "rounded-3", "animate-fade-in");

    questionPost.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fw-bold text-primary small"><i class="fa-solid fa-user"></i> ${name}</span>
            <span class="badge bg-soft-primary text-primary">${tag}</span>
        </div>
        <p class="mb-0 small text-dark fw-bold">${body}</p>
    `;

    // جلب الحائط وإضافة السؤال الجديد في الأعلى تماماً (كأحدث سؤال)
    const wall = document.getElementById("questionsWall");
    wall.insertBefore(questionPost, wall.firstChild);

    // إعادة تصفير الحقول وتفريغها بعد النشر
    document.getElementById("questionForm").reset();
}
function handleAuth(event, type) {
    event.preventDefault(); // منع الصفحة من تحديث نفسها

    let userName = "";

    if (type === 'login') {
        const email = document.getElementById("loginEmail").value;
        // محاكاة استخراج الاسم الأول من الإيميل لتخصيص التجربة
        userName = email.split('@')[0];
    } else if (type === 'register') {
        userName = document.getElementById("regName").value.trim();
    }

    // 1. تحديث منطقة الـ Navbar لإظهار هوية المستخدم الجديد بدلاً من زر الدخول
    const authZone = document.getElementById("auth-zone");
    authZone.innerHTML = `
        <div class="d-flex align-items-center user-avatar-zone bg-white bg-opacity-10 p-2 rounded-pill px-3">
            <span class="me-2"><i class="fa-solid fa-circle-user text-white fs-5"></i> أهلاً، ${userName}</span>
            <button class="btn btn-logout ms-2" onclick="logoutUser()">خروج <i class="fa-solid fa-right-from-bracket"></i></button>
        </div>
    `;

    // 2. إغلاق النافذة المنبثقة تلقائياً بعد نجاح العملية
    const authModalEl = document.getElementById('authModal');
    const modalInstance = bootstrap.Modal.getInstance(authModalEl);
    if (modalInstance) {
        modalInstance.hide();
    }

    // 3. مسح البيانات المكتوبة في النماذج للاستعداد للمرة القادمة
    document.getElementById("loginForm").reset();
    document.getElementById("registerForm").reset();

    // رسالة ترحيبية منبثقة وذكية للمستخدم
    alert(`مرحباً بك يا ${userName} في مستقبلك الرقمي الجديد! 🎉`);
}

function logoutUser() {
    // إعادة الـ Navbar لشكلها الأصلي عند تسجيل الخروج
    const authZone = document.getElementById("auth-zone");
    authZone.innerHTML = `
        <button class="btn btn-light text-primary fw-bold rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#authModal">
            تسجيل الدخول <i class="fa-solid fa-right-to-bracket ms-1"></i>
        </button>
    `;
    alert("تم تسجيل خروجك بأمان. ننتظرك مجدداً! 👋");
}
// غلق القائمة العلوية تلقائياً في الموبايل عند الضغط على أي رابط
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navbarNav');
        // التحقق أولاً إذا كانت القائمة مفتوحة (تحتوي على كلاس show الخاص ببوتستراب)
        if (navbarCollapse.classList.contains('show')) {
            const bootstrapCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bootstrapCollapse) {
                bootstrapCollapse.hide(); // غلق القائمة بنعومة
            }
        }
    });
});