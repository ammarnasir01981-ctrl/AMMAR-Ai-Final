// محلل المسائل الرياضية
const MathSolver = {
    // حل المسألة الرياضية
    solveProblem: function(problemText) {
        // تحليل نوع المسألة
        const problemType = this.analyzeProblemType(problemText);
        
        // حل حسب النوع
        switch (problemType) {
            case 'arithmetic':
                return this.solveArithmetic(problemText);
            case 'algebra':
                return this.solveAlgebra(problemText);
            case 'geometry':
                return this.solveGeometry(problemText);
            default:
                return this.solveGeneral(problemText);
        }
    },
    
    // تحليل نوع المسألة
    analyzeProblemType: function(text) {
        const patterns = {
            arithmetic: /احسب|ما ناتج|ما هو حاصل|[\d\+\-\*\/\^]/,
            algebra: /س|ص|ع|س\+|س\-|س\*|س÷|معادلة|حل|أوجد قيمة/,
            geometry: /مساحة|محيط|حجم|زاوية|مثلث|دائرة|مربع|مستطيل/
        };
        
        for (const [type, pattern] of Object.entries(patterns)) {
            if (pattern.test(text)) {
                return type;
            }
        }
        
        return 'general';
    },
    
    // حل المسائل الحسابية
    solveArithmetic: function(text) {
        try {
            // استخراج التعبير الرياضي
            const expression = this.extractExpression(text);
            
            if (!expression) {
                return {
                    answer: "غير معروف",
                    steps: ["لم أستطع استخراج تعبير رياضي من النص"]
                };
            }
            
            // حل باستخدام math.js
            const result = math.evaluate(expression);
            
            return {
                answer: result,
                steps: [
                    `التعبير الرياضي: ${expression}`,
                    `الخطوات: ${expression}`,
                    `النتيجة: ${result}`
                ]
            };
        } catch (error) {
            return {
                answer: "خطأ",
                steps: ["حدث خطأ في حل المسألة", "تأكد من كتابة المسألة بشكل صحيح"]
            };
        }
    },
    
    // حل المسائل الجبرية
    solveAlgebra: function(text) {
        // هذا مثال مبسط
        return {
            answer: "حل جبري",
            steps: [
                "قراءة المعادلة",
                "تبسيط الطرفين",
                "جمع الحدود المتشابهة",
                "إيجاد قيمة المجهول"
            ]
        };
    },
    
    // حل المسائل الهندسية
    solveGeometry: function(text) {
        // تحديد الشكل الهندسي
        let shape = 'مجهول';
        let formula = '';
        
        if (text.includes('مربع')) {
            shape = 'مربع';
            if (text.includes('مساحة')) {
                formula = 'المساحة = الضلع × الضلع';
            } else if (text.includes('محيط')) {
                formula = 'المحيط = 4 × الضلع';
            }
        } else if (text.includes('دائرة')) {
            shape = 'دائرة';
            if (text.includes('مساحة')) {
                formula = 'المساحة = π × نصف القطر²';
            } else if (text.includes('محيط')) {
                formula = 'المحيط = 2 × π × نصف القطر';
            }
        }
        
        return {
            answer: shape,
            steps: [
                `الشكل: ${shape}`,
                `القانون: ${formula}`,
                "تعويض القيم المعطاة",
                "إجراء الحسابات"
            ]
        };
    },
    
    // حل عام للمسائل
    solveGeneral: function(text) {
        return {
            answer: "تحليل المسألة",
            steps: [
                "قراءة المسألة بعناية",
                "تحديد المعطيات والمطلوب",
                "اختيار القانون أو الطريقة المناسبة",
                "تطبيق الخطوات الحسابية",
                "التحقق من النتيجة"
            ]
        };
    },
    
    // استخراج التعبير الرياضي من النص
    extractExpression: function(text) {
        // استبدال الكلمات برموز رياضية
        let expression = text
            .replace(/زائد|\s\+|\sجمع\s/g, '+')
            .replace(/ناقص|\s\-|\sطرح\s/g, '-')
            .replace(/ضرب|\s\*|\s×\s/g, '*')
            .replace(/قسمة|\s\/|\s÷\s/g, '/')
            .replace(/أس|\^\s/g, '^');
        
        // استخراج الأرقام والعوامل فقط
        const mathRegex = /[\d\+\-\*\/\^\.\(\)\s]/g;
        const matches = expression.match(mathRegex);
        
        return matches ? matches.join('').replace(/\s+/g, '') : null;
    },
    
    // توليد خطوات الحل
    generateSolutionSteps: function(type, problem) {
        const steps = {
            arithmetic: [
                "قراءة المسألة الحسابية",
                "استخراج الأرقام والعوامل",
                "تطبيق أولويات العمليات الحسابية",
                "إجراء الحسابات خطوة بخطوة",
                "التحقق من النتيجة"
            ],
            algebra: [
                "قراءة المعادلة الجبرية",
                "تبسيط كلا الطرفين",
                "جمع الحدود المتشابهة",
                "عزل المتغير المجهول",
                "إيجاد قيمة المجهول"
            ],
            geometry: [
                "تحديد الشكل الهندسي",
                "كتابة القوانين المناسبة",
                "استخراج القيم المعطاة",
                "تعويض في القانون",
                "إجراء الحسابات النهائية"
            ]
        };
        
        return steps[type] || ["تحليل المسألة", "تطبيق القوانين", "الوصول للحل"];
    }
};

// جعل محلل الرياضيات متاحاً عالمياً
window.MathSolver = MathSolver;
