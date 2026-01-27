// محمل المكتبات المعرفية
const KnowledgeLoader = {
    // تحميل مكتبة معرفية
    loadLibrary: async function(libraryName) {
        try {
            const response = await fetch(`knowledge/${libraryName}.json`);
            const data = await response.json();
            console.log(`✅ تم تحميل مكتبة ${data.subject}`);
            return data;
        } catch (error) {
            console.error(`❌ خطأ في تحميل ${libraryName}:`, error);
            return this.getDefaultLibrary(libraryName);
        }
    },
    
    // تحميل جميع المكتبات
    loadAllLibraries: async function() {
        const libraries = ['math', 'physics', 'chemistry'];
        const promises = libraries.map(lib => this.loadLibrary(lib));
        
        try {
            const results = await Promise.all(promises);
            results.forEach((data, index) => {
                window[libraries[index].charAt(0).toUpperCase() + libraries[index].slice(1) + 'Library'] = data;
            });
            console.log('🎉 تم تحميل جميع المكتبات المعرفية');
            return true;
        } catch (error) {
            console.error('❌ خطأ في تحميل المكتبات:', error);
            return false;
        }
    },
    
    // مكتبات افتراضية
    getDefaultLibrary: function(name) {
        const defaultLibraries = {
            math: {
                subject: "الرياضيات",
                lessons: [
                    {
                        id: 1,
                        title: "مكتبة الرياضيات",
                        content: "مكتبة الرياضيات الافتراضية. يرجى تحميل المكتبة الكاملة للحصول على جميع الدروس."
                    }
                ]
            },
            physics: {
                subject: "الفيزياء",
                lessons: [
                    {
                        id: 1,
                        title: "مكتبة الفيزياء",
                        content: "مكتبة الفيزياء الافتراضية. يرجى تحميل المكتبة الكاملة للحصول على جميع الدروس."
                    }
                ]
            },
            chemistry: {
                subject: "الكيمياء",
                lessons: [
                    {
                        id: 1,
                        title: "مكتبة الكيمياء",
                        content: "مكتبة الكيمياء الافتراضية. يرجى تحميل المكتبة الكاملة للحصول على جميع الدروس."
                    }
                ]
            }
        };
        
        return defaultLibraries[name] || { subject: name, lessons: [] };
    },
    
    // البحث في جميع المكتبات
    searchAllLibraries: function(keyword) {
        const results = [];
        const libraries = ['MathLibrary', 'PhysicsLibrary', 'ChemistryLibrary'];
        
        libraries.forEach(libName => {
            const library = window[libName];
            if (library && library.lessons) {
                library.lessons.forEach(lesson => {
                    if (lesson.title.includes(keyword) || lesson.content.includes(keyword)) {
                        results.push({
                            library: library.subject,
                            lesson: lesson
                        });
                    }
                });
            }
        });
        
        return results;
    }
};

// جعل محمل المكتبات متاحاً عالمياً
window.KnowledgeLoader = KnowledgeLoader;
