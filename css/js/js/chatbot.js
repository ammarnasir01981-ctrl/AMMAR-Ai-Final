// نظام المحادثة الذكي
class ChatBot {
    constructor() {
        this.history = [];
        this.isOpen = false;
        this.initialize();
    }
    
    initialize() {
        // إنشاء واجهة المحادثة إذا لم تكن موجودة
        if (!document.getElementById('ai-chat-widget')) {
            this.createChatInterface();
        }
        
        // إضافة معالج الأحداث لحقل الإدخال
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        console.log('🤖 تم تهيئة نظام المحادثة');
    }
    
    createChatInterface() {
        // الواجهة موجودة بالفعل في HTML
        console.log('✅ واجهة المحادثة موجودة بالفعل');
    }
    
    openChat() {
        const chatWidget = document.getElementById('ai-chat-widget');
        const openBtn = document.getElementById('open-chat');
        
        if (chatWidget && openBtn) {
            chatWidget.style.display = 'block';
            openBtn.style.display = 'none';
            this.isOpen = true;
            
            // التركيز على حقل الإدخال
            const input = document.getElementById('chat-input');
            if (input) {
                input.focus();
            }
            
            // إضافة رسالة ترحيبية إذا كانت السجلات فارغة
            if (this.history.length === 0) {
                this.addMessage("مرحباً بك! أنا المساعد الذكي لـ Ammar AI. اسألني عن أي موضوع دراسي، وسأجيبك فوراً! 😊", 'ai');
            }
        }
    }
    
    closeChat() {
        const chatWidget = document.getElementById('ai-chat-widget');
        const openBtn = document.getElementById('open-chat');
        
        if (chatWidget && openBtn) {
            chatWidget.style.display = 'none';
            openBtn.style.display = 'block';
            this.isOpen = false;
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input) return;
        
        const message = input.value.trim();
        if (message === '') return;
        
        // إضافة رسالة المستخدم
        this.addMessage(message, 'user');
        
        // مسح حقل الإدخال
        input.value = '';
        
        // معالجة الرسالة والرد بعد تأخير
        setTimeout(() => {
            this.processAIResponse(message);
        }, 800);
    }
    
    addMessage(text, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `<strong>أنت:</strong> ${text}`;
        } else {
            messageDiv.innerHTML = `<strong>Ammar AI:</strong> ${text}`;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // حفظ في السجل
        this.history.push({
            text: text,
            sender: sender,
            time: new Date().toLocaleTimeString()
        });
    }
    
    processAIResponse(userMessage) {
        let response = '';
        
        // 1. التحقق إذا كان سؤالاً رياضياً
        if (this.isMathQuestion(userMessage)) {
            response = this.handleMathQuestion(userMessage);
        }
        // 2. البحث في المكتبات المعرفية
        else if (window.AmmarApp) {
            const results = window.AmmarApp.searchInLibraries(userMessage);
            if (results.length > 0) {
                const firstResult = results[0];
                response = `📚 ${firstResult.subject} - ${firstResult.lesson.title}:\n\n${firstResult.lesson.content.substring(0, 300)}...`;
            } else {
                response = this.getDefaultResponse(userMessage);
            }
        }
        // 3. استخدام رد افتراضي
        else {
            response = this.getDefaultResponse(userMessage);
        }
        
        // إضافة رد الذكاء الاصطناعي
        this.addMessage(response, 'ai');
    }
    
    isMathQuestion(text) {
        const mathKeywords = ['احسب', 'حل', 'جد', 'ما قيمة', 'مساحة', 'محيط', 'حجم', '+', '-', '×', '÷', '='];
        return mathKeywords.some(keyword => text.includes(keyword));
    }
    
    handleMathQuestion(question) {
        try {
            // استخدام محلل المسائل الرياضية إذا كان متاحاً
            if (window.MathSolver) {
                const solution = window.MathSolver.solveProblem(question);
                return `🧮 الحل:\n\n${solution.steps}\n\n✅ الإجابة: ${solution.answer}`;
            }
            
            // محاولة استخدام math.js مباشرة
            if (window.math) {
                // استخراج التعبير الرياضي من النص
                const expression = this.extractMathExpression(question);
                if (expression) {
                    const result = math.evaluate(expression);
                    return `🧮 حساب ${expression} = ${result}`;
                }
            }
            
            return "أحتاج إلى مزيد من المعلومات لحل هذه المسألة الرياضية. هل يمكنك كتابتها بشكل أكثر وضوحاً؟";
        } catch (error) {
            console.error('خطأ في حل المسألة الرياضية:', error);
            return "عذراً، لم أستطع حل هذه المسألة. يمكنك طرحها بشكل مختلف أو سؤال آخر.";
        }
    }
    
    extractMathExpression(text) {
        // استخراج الأرقام والعوامل الرياضية من النص
        const mathRegex = /[\d\+\-\*\/\^\.\(\)\s]+/g;
        const matches = text.match(mathRegex);
        return matches ? matches[0].trim() : null;
    }
    
    getDefaultResponse(query) {
        const responses = {
            "مرحباً": "أهلاً وسهلاً بك! أنا Ammar AI، مساعدك التعليمي الذكي. 😊",
            "كيف حالك": "أنا بخير، شكراً لسؤالك! جاهز لمساعدتك في دراستك. 📚",
            "شكراً": "العفو! أنا هنا لمساعدتك دائماً. 💚",
            "باي": "إلى اللقاء! لا تتردد في العودة إذا كان لديك أي سؤال. 👋",
            "مساعدة": "يمكنني مساعدتك في:\n• شرح المواد الدراسية\n• حل المسائل الرياضية\n• الإجابة على أسئلة العلوم\n• توفير أمثلة وتدريبات\nما الذي تريد المساعدة فيه؟"
        };
        
        query = query.toLowerCase();
        for (const [key, value] of Object.entries(responses)) {
            if (query.includes(key.toLowerCase())) {
                return value;
            }
        }
        
        // ردود عامة
        const generalResponses = [
            "هذا سؤال مثير للاهتمام! دعني أبحث عن الإجابة في مكتبتي المعرفية... 🔍",
            "أحتاج إلى مزيد من التفاصيل للإجابة على سؤالك بدقة. هل يمكنك إعادة صياغته؟ 🤔",
            "جاري البحث عن المعلومات حول: " + query,
            "سؤال رائع! دعني أستعرض المكتبات التعليمية لأجد أفضل إجابة لك. 📖"
        ];
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    updateChatUI() {
        // يمكن إضافة تحديثات إضافية لواجهة المحادثة هنا
    }
}

// إنشاء وإظهار كائن المحادثة
window.chatbot = new ChatBot();
