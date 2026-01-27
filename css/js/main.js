// Ammar AI - الملف الرئيسي للتطبيق
const AmmarApp = {
    version: "3.0",
    developer: "Ammar Nasir Hussein al-Mantafji",
    
    // تهيئة التطبيق
    init: function() {
        console.log('%c🚀 Ammar AI System v' + this.version, 'color: #1ABC9C; font-size: 20px; font-weight: bold;');
        console.log('%c👨‍💻 المطور: ' + this.developer, 'color: #3498DB;');
        
        // تحميل المكتبات المعرفية
        this.loadKnowledgeLibraries();
        
        // إنشاء بطاقات الميزات
        this.createFeatureCards();
        
        // إضافة معالجات الأحداث
        this.setupEventListeners();
        
        // تهيئة نظام المحادثة
        this.initChatSystem();
        
        console.log('%c✅ تم تهيئة النظام بنجاح', 'color: #2ECC71; font-size: 16px;');
    },
    
    // تحميل المكتبات المعرفية
    loadKnowledgeLibraries: async function() {
        console.log('📚 جاري تحميل المكتبات المعرفية...');
        
        try {
            // تحميل مكتبة الرياضيات
            const mathResponse = await fetch('knowledge/math.json');
            const mathData = await mathResponse.json();
            window.MathLibrary = mathData;
            
            // تحميل مكتبة الفيزياء
            const physicsResponse = await fetch('knowledge/physics.json');
            const physicsData = await physicsResponse.json();
            window.PhysicsLibrary = physicsData;
            
            // تحميل مكتبة الكيمياء
            const chemistryResponse = await fetch('knowledge/chemistry.json');
            const chemistryData = await chemistryResponse.json();
            window.ChemistryLibrary = chemistryData;
            
            console.log('✅ تم تحميل جميع المكتبات المعرفية');
        } catch (error) {
            console.warn('⚠️ تعذر تحميل بعض المكتبات، استخدام المكتبات الافتراضية', error);
            this.loadDefaultLibraries();
        }
    },
    
    // المكتبات الافتراضية
    loadDefaultLibraries: function() {
        window.MathLibrary = {
            subject: "الرياضيات",
            lessons: [
                {
                    id: 1,
                    title: "المعادلات الخطية",
                    content: "المعادلة الخطية: ax + b = 0، الحل: x = -b/a"
                }
            ]
        };
        
        window.PhysicsLibrary = {
            subject: "الفيزياء",
            lessons: [
                {
                    id: 1,
                    title: "قوانين نيوتن",
                    content: "القانون الثاني: F = m × a"
                }
            ]
        };
    },
    
    // إنشاء بطاقات الميزات
    createFeatureCards: function() {
        const features = [
            {
                id: 'math',
                icon: 'fa-calculator',
                color: '#1ABC9C',
                title: 'الرياضيات',
                description: 'الجبر، الهندسة، التفاضل والتكامل، الإحصاء، حل المعادلات، الرسوم البيانية'
            },
            {
                id: 'physics',
                icon: 'fa-atom',
                color: '#3498DB',
                title: 'الفيزياء',
                description: 'الميكانيكا، الكهرباء، البصريات، الديناميكا الحرارية، الفيزياء الحديثة'
            },
            {
                id: 'chemistry',
                icon: 'fa-flask',
                color: '#9B59B6',
                title: 'الكيمياء',
                description: 'العناصر، التفاعلات، المركبات، الكيمياء العضوية، الحسابات الكيميائية'
            },
            {
                id: 'biology',
                icon: 'fa-dna',
                color: '#E74C3C',
                title: 'الأحياء',
                description: 'الخلية، الوراثة، التشريح، التطور، البيئة، الأحياء الدقيقة'
            },
            {
                id: 'programming',
                icon: 'fa-code',
                color: '#F39C12',
                title: 'البرمجة',
                description: 'Python، JavaScript، HTML/CSS، هياكل البيانات، الخوارزميات'
            },
            {
                id: 'ai',
                icon: 'fa-robot',
                color: '#2ECC71',
                title: 'الذكاء الاصطناعي',
                description: 'تعلم الآلة، الشبكات العصبية، معالجة اللغة، رؤية الحاسب'
            }
        ];
        
        const container = document.getElementById('features-container');
        if (!container) return;
        
        let html = '';
        features.forEach(feature => {
            html += `
                <div class="feature-card" onclick="AmmarApp.openSubject('${feature.id}')">
                    <i class="fas ${feature.icon} feature-icon" style="color: ${feature.color};"></i>
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            `;
        });
        
        container.innerHTML = html;
    },
    
    // إضافة معالجات الأحداث
    setupEventListeners: function() {
        // زر بدء التعلم
        const startBtn = document.getElementById('start-learning-btn');
        if (startBtn) {
            startBtn.addEventListener('click', this.startLearning);
        }
        
        // زر استكشاف الميزات
        const exploreBtn = document.getElementById('explore-features-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', this.exploreFeatures);
        }
        
        // زر فتح المحادثة
        const chatBtn = document.getElementById('open-chat-btn');
        if (chatBtn) {
            chatBtn.addEventListener('click', () => {
                if (window.chatbot) {
                    window.chatbot.openChat();
                }
            });
        }
    },
    
    // تهيئة نظام المحادثة
    initChatSystem: function() {
        // سيتم تهيئته بواسطة chatbot.js
        setTimeout(() => {
            if (window.chatbot && !window.chatbot.history.length) {
                window.chatbot.openChat();
            }
        }, 3000);
    },
    
    // بدء التعلم
    startLearning: function() {
        const subjects = ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'البرمجة'];
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        
        const message = `🎓 هيا نبدأ رحلة التعلم!\n\nسأبدأ بتعليمك ${subject}.\n\nماذا تريد أن تتعلم أولاً؟\n1. المفاهيم الأساسية\n2. حل مسائل\n3. أمثلة عملية\n4. اختبار نفسك`;
        
        alert(message);
    },
    
    // استكشاف الميزات
    exploreFeatures: function() {
        const features = [
            '🤖 مساعد ذكي يجيب على جميع الأسئلة',
            '📚 مكتبات معرفية في جميع المواد',
            '🧮 حل المسائل خطوة بخطوة مع الشرح',
            '💬 محادثة تفاعلية باللغة العربية',
            '📊 تتبع التقدم الدراسي',
            '🎬 فيديوهات تعليمية',
            '📝 اختبارات تفاعلية',
            '📈 تحليل نقاط القوة والضعف',
            '🌙 وضع التصفح الليلي',
            '📱 تطبيق متوافق مع جميع الأجهزة'
        ];
        
        let message = '✨ ميزات Ammar AI المتكاملة:\n\n';
        features.forEach((feature, index) => {
            message += `${index + 1}. ${feature}\n`;
        });
        
        message += '\n🎯 اختر أي ميزة لتبدأ!';
        
        alert(message);
    },
    
    // فتح موضوع معين
    openSubject: function(subjectId) {
        const subjectNames = {
            'math': 'الرياضيات',
            'physics': 'الفيزياء',
            'chemistry': 'الكيمياء',
            'biology': 'الأحياء',
            'programming': 'البرمجة',
            'ai': 'الذكاء الاصطناعي'
        };
        
        const name = subjectNames[subjectId] || subjectId;
        alert(`🎯 افتتحت قسم ${name}\n\nجاري تحميل المكتبة المعرفية والدروس الخاصة بهذا الموضوع...`);
    },
    
    // البحث في المكتبات
    searchInLibraries: function(keyword) {
        const results = [];
        keyword = keyword.toLowerCase();
        
        // البحث في مكتبة الرياضيات
        if (window.MathLibrary && window.MathLibrary.lessons) {
            window.MathLibrary.lessons.forEach(lesson => {
                if (lesson.title.toLowerCase().includes(keyword) || 
                    lesson.content.toLowerCase().includes(keyword)) {
                    results.push({
                        subject: 'الرياضيات',
                        lesson: lesson
                    });
                }
            });
        }
        
        // البحث في مكتبة الفيزياء
        if (window.PhysicsLibrary && window.PhysicsLibrary.lessons) {
            window.PhysicsLibrary.lessons.forEach(lesson => {
                if (lesson.title.toLowerCase().includes(keyword) || 
                    lesson.content.toLowerCase().includes(keyword)) {
                    results.push({
                        subject: 'الفيزياء',
                        lesson: lesson
                    });
                }
            });
        }
        
        return results;
    }
};

// جعل التطبيق متاحاً عالمياً
window.AmmarApp = AmmarApp;
