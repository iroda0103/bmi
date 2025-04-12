<template>
    <div class="code-block-container">
      <div class="code-block">
        <div class="code-toolbar">
          <select @change="updateLanguage" v-model="selectedLanguage" :disabled="readonly">
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <button @click="runCode" class="run-button">Ishga tushirish</button>
        </div>
        
        <pre><code :class="`language-${selectedLanguage}`" ref="codeElement">{{ content }}</code></pre>
        
        <textarea 
          ref="codeEditor"
          class="code-editor"
          @input="updateContent"
          v-model="localContent"
          :readonly="readonly"
        ></textarea>
      </div>
      
      <div v-if="showResult" class="code-result">
        <div class="result-toolbar">
          <h3>Natija</h3>
          <button @click="closeResult" class="close-result">✕</button>
        </div>
        <div class="result-container">
          <div v-if="selectedLanguage === 'html'" ref="htmlResult"></div>
          <div v-else-if="selectedLanguage === 'javascript'" class="js-result">
            <div id="jsOutput"></div>
            <div ref="jsConsole" class="js-console"></div>
          </div>
          <div v-else-if="selectedLanguage === 'css'" class="css-result">
            <div class="css-preview" ref="cssPreview">
              <h1>Sarlavha</h1>
              <p>Bu CSS orqali stillanayotgan matn.</p>
              <div class="container">
                <h2>Konteyner ichidagi sarlavha</h2>
                <p>Konteyner ichidagi matn bloki.</p>
                <button>Tugma</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Prism from 'prismjs';
  
  export default {
    props: {
      content: {
        type: String,
        default: '// Kod yozing'
      },
      language: {
        type: String,
        default: 'javascript'
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        localContent: this.content,
        selectedLanguage: this.language,
        showResult: false,
        consoleOutput: [],
        originalConsoleLog: null
      };
    },
    methods: {
      updateContent() {
        this.$emit('update:content', this.localContent);
        this.highlightCode();
      },
      updateLanguage() {
        this.$emit('update:language', this.selectedLanguage);
        this.highlightCode();
      },
      highlightCode() {
        setTimeout(() => {
          Prism.highlightElement(this.$refs.codeElement);
        }, 0);
      },
      runCode() {
        this.showResult = true;
        
        if (this.selectedLanguage === 'javascript') {
          this.runJavaScript();
        } else if (this.selectedLanguage === 'html') {
          this.runHTML();
        } else if (this.selectedLanguage === 'css') {
          this.runCSS();
        }
      },
      runJavaScript() {
        const jsConsole = this.$refs.jsConsole;
        jsConsole.innerHTML = '';
        
        // Console.log-ni qayta yo'naltirish
        const originalConsole = { ...console };
        const outputDiv = document.getElementById('jsOutput');
        outputDiv.innerHTML = '';
        
        console.log = (...args) => {
          const output = args.map(arg => {
            if (typeof arg === 'object') {
              return JSON.stringify(arg, null, 2);
            }
            return String(arg);
          }).join(' ');
          
          const logLine = document.createElement('div');
          logLine.className = 'console-line';
          logLine.textContent = output;
          jsConsole.appendChild(logLine);
          originalConsole.log(...args);
        };
        
        try {
          // document.getElementById() uchun vaqtinchalik element
          const tempDiv = document.createElement('div');
          tempDiv.id = 'natija';
          outputDiv.appendChild(tempDiv);
          
          // Kodni bajarish
          const functionBody = this.localContent;
          const codeFunction = new Function(functionBody);
          codeFunction();
        } catch (error) {
          const errorLine = document.createElement('div');
          errorLine.className = 'console-error';
          errorLine.textContent = `Xatolik: ${error.message}`;
          jsConsole.appendChild(errorLine);
        } finally {
          // Console.log-ni qayta tiklash
          console.log = originalConsole.log;
        }
      },
      runHTML() {
        const htmlResult = this.$refs.htmlResult;
        htmlResult.innerHTML = this.localContent;
        
        // Stillar va skriptlarni to'g'ri ishlashi uchun
        const scripts = htmlResult.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      },
      runCSS() {
        const cssPreview = this.$refs.cssPreview;
        
        // Eski stil elementini o'chirish
        const oldStyle = document.getElementById('dynamic-css');
        if (oldStyle) oldStyle.remove();
        
        // Yangi stil elementi yaratish
        const styleElement = document.createElement('style');
        styleElement.id = 'dynamic-css';
        styleElement.textContent = this.localContent;
        document.head.appendChild(styleElement);
      },
      closeResult() {
        this.showResult = false;
      }
    },
    mounted() {
      this.localContent = this.content;
      this.highlightCode();
    },
    watch: {
      content(newVal) {
        this.localContent = newVal;
        this.highlightCode();
      },
      language(newVal) {
        this.selectedLanguage = newVal;
        this.highlightCode();
      }
    }
  };
  </script>
  
  <style>
  .code-block-container {
    margin-bottom: 30px;
  }
  
  .code-block {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  
  .code-toolbar {
    background-color: #2d2d2d;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  
  .code-toolbar select {
    padding: 5px;
    border-radius: 3px;
    border: none;
    background-color: #3c3c3c;
    color: white;
  }
  
  .run-button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .run-button:hover {
    background-color: #45a049;
  }
  
  .code-block pre {
    margin: 0;
    padding: 15px;
    background-color: #2d2d2d;
    color: white;
    overflow-x: auto;
  }
  
  .code-editor {
    position: absolute;
    top: 37px;
    left: 0;
    width: 100%;
    height: calc(100% - 37px);
    padding: 15px;
    background-color: rgba(45, 45, 45, 0.3);
    color: transparent;
    border: none;
    resize: none;
    font-family: monospace;
    font-size: 14px;
    caret-color: white;
    z-index: 2;
  }
  
  .code-editor:focus {
    outline: none;
  }
  
  .code-result {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  
  .result-toolbar {
    background-color: #f1f1f1;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .result-toolbar h3 {
    margin: 0;
  }
  
  .close-result {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  .result-container {
    padding: 15px;
    min-height: 100px;
    max-height: 300px;
    overflow: auto;
  }
  
  .js-console {
    font-family: monospace;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-top: 10px;
  }
  
  .console-line {
    margin-bottom: 5px;
  }
  
  .console-error {
    color: red;
    margin-bottom: 5px;
  }
  
  .css-preview {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  </style>