<template>
    <div class="assignment-container">
      <div class="lesson-header">
        <h2>{{ currentLesson.title }}</h2>
        <div class="lesson-description" v-html="currentLesson.description"></div>
      </div>
  
      <div class="assignment-wrapper">
        <div class="assignment-card">
          <h3>Topshiriq</h3>
          <div class="task-description" v-html="currentAssignment.task"></div>
          
          <div class="input-output-example" v-if="currentAssignment.examples.length > 0">
            <h4>Kirish va chiqish namunalari:</h4>
            <div v-for="(example, index) in currentAssignment.examples" :key="index" class="example-item">
              <div class="example-input">
                <strong>Kirish:</strong> {{ example.input }}
              </div>
              <div class="example-output">
                <strong>Chiqish:</strong> {{ example.output }}
              </div>
            </div>
          </div>
        </div>
  
        <div class="code-editor-container">
          <div class="editor-header">
            <select v-model="selectedLanguage" class="language-selector">
              <option v-for="lang in availableLanguages" :key="lang.value" :value="lang.value">
                {{ lang.label }}
              </option>
            </select>
            <button @click="runCode" class="run-button">
              <span class="run-icon">▶</span> Kodni Ishga Tushirish
            </button>
          </div>
          
          <div class="editor-wrapper">
            <textarea 
              v-model="code" 
              class="code-editor" 
              placeholder="Kodingizni shu yerga yozing..."
              @keydown.tab.prevent="handleTab"
            ></textarea>
          </div>
          
          <div v-if="showOutput" class="output-container">
            <div class="output-header">
              <h4>Natija:</h4>
              <button @click="closeOutput" class="close-button">✕</button>
            </div>
            <div class="output-content" :class="{ 'output-success': executionSuccess, 'output-error': !executionSuccess }">
              <pre>{{ outputResult }}</pre>
            </div>
          </div>
          
          <div class="action-buttons">
            <button @click="checkSolution" class="submit-button">Topshiriqni Tekshirish</button>
            <button @click="resetCode" class="reset-button">Kodni Tiklash</button>
          </div>
        </div>
      </div>
  
      <div v-if="showFeedback" class="feedback-container" :class="{ 'feedback-success': feedbackSuccess, 'feedback-error': !feedbackSuccess }">
        <div class="feedback-header">
          <h4>{{ feedbackSuccess ? 'Tabriklaymiz!' : 'Xatolik mavjud' }}</h4>
          <button @click="closeFeedback" class="close-button">✕</button>
        </div>
        <div class="feedback-content">
          <p>{{ feedbackMessage }}</p>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'AssignmentComponent',
    data() {
      return {
        // Foydalanuvchi ma'lumotlari
        code: '',
        selectedLanguage: 'javascript',
        showOutput: false,
        executionSuccess: true,
        outputResult: '',
        showFeedback: false,
        feedbackSuccess: false,
        feedbackMessage: '',
        
        // Mavjud dasturlash tillari
        availableLanguages: [
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
          { value: 'cpp', label: 'C++' }
        ],
        
        // Joriy dars ma'lumotlari (lokal)
        currentLesson: {
          id: 1,
          title: 'Algoritm Asoslari va Rekursiya',
          description: 'Bu darsda rekursiya bilan ishlash va algoritmik masalalarni yechishni o\'rganamiz.'
        },
        
        // Joriy topshiriq ma'lumotlari (lokal)
        currentAssignment: {
          id: 1,
          lessonId: 1,
          title: 'Fibonacci sonlarini hisoblash',
          task: `<p>Fibonacci sonlar ketma-ketligining n-chi sonini topadigan funksiya yozing.</p>
                <p>Fibonacci ketma-ketligi quyidagicha aniqlanadi:</p>
                <ul>
                  <li>F(0) = 0</li>
                  <li>F(1) = 1</li>
                  <li>F(n) = F(n-1) + F(n-2), n > 1</li>
                </ul>
                <p><strong>Vazifa:</strong> <code>fibonacci(n)</code> funksiyasini yarating, u n-chi Fibonacci sonini qaytarishi kerak.</p>`,
          initialCode: {
            javascript: `function fibonacci(n) {\n  // Kodingizni shu yerga yozing\n\n}`,
            python: `def fibonacci(n):\n  # Kodingizni shu yerga yozing\n  pass`,
            java: `public class Solution {\n  public static int fibonacci(int n) {\n    // Kodingizni shu yerga yozing\n    return 0;\n  }\n}`,
            cpp: `#include <iostream>\n\nint fibonacci(int n) {\n  // Kodingizni shu yerga yozing\n  return 0;\n}`
          },
          examples: [
            { input: 'fibonacci(0)', output: '0' },
            { input: 'fibonacci(1)', output: '1' },
            { input: 'fibonacci(5)', output: '5' },
            { input: 'fibonacci(10)', output: '55' }
          ],
          testCases: [
            { input: 0, expected: 0 },
            { input: 1, expected: 1 },
            { input: 2, expected: 1 },
            { input: 5, expected: 5 },
            { input: 10, expected: 55 },
            { input: 15, expected: 610 }
          ]
        }
      };
    },
    mounted() {
      // Topshiriq yuklanganda boshlang'ich kodni tahrirlash maydoniga joylash
      this.resetCode();
    },
    methods: {
      // Tab tugmasi bosilganda 2 ta bo'sh joy qo'shish
      handleTab(e) {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        
        this.code = this.code.substring(0, start) + '  ' + this.code.substring(end);
        
        // Kursorni to'g'ri joyga o'rnatish
        this.$nextTick(() => {
          e.target.selectionStart = e.target.selectionEnd = start + 2;
        });
      },
      
      // Kodni ishga tushirish - TUZATILGAN VERSIYA
      runCode() {
        try {
        if (this.selectedLanguage === 'javascript') {
          // JavaScript kodini tekshirish
          const userFunction = new Function(`
            ${this.code}
            
            // Test holatlarini tekshirish
            const testCases = ${JSON.stringify(this.currentAssignment.testCases)};
            const results = [];
            
            for (const test of testCases) {
              const result = fibonacci(test.input);
              const passed = result === test.expected;
              results.push({
                input: test.input,
                expected: test.expected,
                actual: result,
                passed: passed
              });
            }
            
            return results;
          `);
          
          const testResults = userFunction();
          const allPassed = testResults.every(result => result.passed);
          
          if (allPassed) {
            this.showSuccessFeedback();
          } else {
            const failedTests = testResults.filter(result => !result.passed);
            this.showErrorFeedback(failedTests);
          }
        } else {
          this.feedbackSuccess = false;
          this.feedbackMessage = "Yechimni tekshirish uchun JavaScript tilini tanlang.";
          this.showFeedback = true;
        }
      } catch (error) {
        this.feedbackSuccess = false;
        this.feedbackMessage = `Xatolik yuz berdi: ${error.message}. Kodingizni to'g'rilang va qaytadan urinib ko'ring.`;
        this.showFeedback = true;
      }
        
      },
      
      // Yechimni tekshirish - TUZATILGAN VERSIYA
      checkSolution() {
      try {
        if (this.selectedLanguage === 'javascript') {
          // JavaScript kodini tekshirish
          const userFunction = new Function(`
            ${this.code}
            
            // Test holatlarini tekshirish
            const testCases = ${JSON.stringify(this.currentAssignment.testCases)};
            const results = [];
            
            for (const test of testCases) {
              const result = fibonacci(test.input);
              const passed = result === test.expected;
              results.push({
                input: test.input,
                expected: test.expected,
                actual: result,
                passed: passed
              });
            }
            
            return results;
          `);
          
          const testResults = userFunction();
          const allPassed = testResults.every(result => result.passed);
          
          if (allPassed) {
            this.showSuccessFeedback();
          } else {
            const failedTests = testResults.filter(result => !result.passed);
            this.showErrorFeedback(failedTests);
          }
        } else {
          this.feedbackSuccess = false;
          this.feedbackMessage = "Yechimni tekshirish uchun JavaScript tilini tanlang.";
          this.showFeedback = true;
        }
      } catch (error) {
        this.feedbackSuccess = false;
        this.feedbackMessage = `Xatolik yuz berdi: ${error.message}. Kodingizni to'g'rilang va qaytadan urinib ko'ring.`;
        this.showFeedback = true;
      }
        },

      // Kod tiklash
      resetCode() {
        this.code = this.currentAssignment.initialCode[this.selectedLanguage] || '';
      },
      
      // Natija oynasini yopish
      closeOutput() {
        this.showOutput = false;
      },
      
      // Fikr-mulohaza oynasini yopish
      closeFeedback() {
        this.showFeedback = false;
      },
      
      // Muvaffaqiyatli fikr-mulohaza ko'rsatish
      showSuccessFeedback() {
        this.feedbackSuccess = true;
        this.feedbackMessage = "Tabriklaymiz! Barcha test holatlar muvaffaqiyatli o'tdi. Topshiriq to'g'ri bajarildi.";
        this.showFeedback = true;
      },
      
      // Xatolik fikr-mulohazasini ko'rsatish
      showErrorFeedback(failedTests) {
        let message = "Quyidagi test holatlar muvaffaqiyatsiz bo'ldi:\n";
        
        failedTests.forEach(test => {
          message += `- Kirish: ${test.input}, Kutilgan: ${test.expected}, Olingan: ${test.actual}\n`;
        });
        
        message += "\nKodingizni to'g'rilang va qaytadan urinib ko'ring.";
        
        this.feedbackSuccess = false;
        this.feedbackMessage = message;
        this.showFeedback = true;
      }
    }
}
</script>
  
<style scoped>
  body {
    background-color: #181818;
    color: #f1f1f1;
    margin: 0;
    padding: 0;
  }
  
  .assignment-container {
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    max-width: 1200px;
    margin: 20px auto;
    padding: 25px;
    background: linear-gradient(90deg, rgba(0, 255, 0, 0.15), rgba(0, 255, 255, 0.15));
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    color: #f1f1f1;
  }
  
  .lesson-header {
    margin-bottom: 20px;
    padding: 15px;
    background-color: rgba(40, 40, 40, 0.9);
    border-radius: 8px;
    border-left: 4px solid #00cc66;
  }
  
  .lesson-header h2 {
    color: #ffffff;
    font-size: 24px;
    margin-top: 0;
  }
  
  .lesson-description {
    color: #cccccc;
    line-height: 1.5;
  }
  
  .assignment-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  @media (min-width: 992px) {
    .assignment-wrapper {
      flex-direction: row;
    }
    
    .assignment-card {
      flex: 1;
      max-width: 40%;
    }
    
    .code-editor-container {
      flex: 2;
    }
  }
  
  .assignment-card {
    background-color: rgba(40, 40, 40, 0.9);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  }
  
  .assignment-card h3 {
    color: #00ffaa;
    margin-top: 0;
    border-bottom: 2px solid #00cc66;
    padding-bottom: 10px;
  }
  
  .task-description {
    margin-bottom: 20px;
    line-height: 1.6;
    color: #dcdcdc;
  }
  
  .task-description ul {
    padding-left: 20px;
  }
  
  .task-description code {
    background-color: #333333;
    padding: 2px 5px;
    border-radius: 3px;
    color: #00ffcc;
  }
  
  .input-output-example {
    background-color: rgba(50, 50, 50, 0.7);
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
  }
  
  .input-output-example h4 {
    color: #00ffaa;
    margin-top: 0;
  }
  
  .example-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #444;
  }
  
  .example-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .example-input strong, .example-output strong {
    color: #00ccff;
  }
  
  .code-editor-container {
    background-color: rgba(40, 40, 40, 0.9);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  }
  
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .language-selector {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #444;
    background-color: #333;
    font-size: 14px;
    color: #fff;
  }
  
  .run-button {
    display: flex;
    align-items: center;
    background-color: #00cc66;
    color: #111;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .run-button:hover {
    background-color: #00ff80;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 204, 102, 0.3);
  }
  
  .run-icon {
    margin-right: 8px;
  }
  
  .editor-wrapper {
    position: relative;
    margin-bottom: 15px;
  }
  
  .code-editor {
    width: 100%;
    min-height: 300px;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #444;
    background-color: #2a2a2a;
    color: #f1f1f1;
    resize: vertical;
    tab-size: 2;
  }
  
  .output-container {
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #444;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    background-color: #333;
    border-bottom: 1px solid #444;
  }
  
  .output-header h4 {
    margin: 0;
    color: #00ffaa;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 16px;
    transition: color 0.2s;
  }
  
  .close-button:hover {
    color: #fff;
  }
  
  .output-content {
    padding: 15px;
    max-height: 200px;
    overflow-y: auto;
    background-color: #252525;
  }
  
  .output-content pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 14px;
  }
  
  .output-success {
    color: #dcdcdc;
  }
  
  .output-error {
    color: #ff6b6b;
    background-color: #2a2222;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  
  .submit-button {
    background-color: #00aaff;
    color: #111;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    flex: 1;
    transition: all 0.3s;
  }
  
  .submit-button:hover {
    background-color: #33bbff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 170, 255, 0.3);
  }
  
  .reset-button {
    background-color: #666;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .reset-button:hover {
    background-color: #888;
    transform: translateY(-2px);
  }
  
  .feedback-container {
    margin-top: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  }
  
  .feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
  }
  
  .feedback-success .feedback-header {
    background-color: #00cc66;
    color: #111;
  }
  
  .feedback-error .feedback-header {
    background-color: #ff4757;
    color: #fff;
  }
  
  .feedback-header h4 {
    margin: 0;
    font-weight: bold;
  }
  
  .feedback-content {
    padding: 15px;
    background-color: #2a2a2a;
    color: #dcdcdc;
  }
  
  .feedback-success .feedback-content {
    border-left: 4px solid #00cc66;
  }
  
  .feedback-error .feedback-content {
    border-left: 4px solid #ff4757;
  }
  
  .feedback-content p {
    margin: 0;
    white-space: pre-line;
  }
</style>