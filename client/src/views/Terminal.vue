<template>
  <div class="code-playground">
    <h1>JavaScript Code Editor</h1>
    <div class="editor-container">
      <div class="editor-section">
        <h3>JavaScript kodini yozing</h3>
        <div class="editor-toolbar">
          <button @click="runCode" class="run-button">Run <span class="icon">▶</span></button>
          <button @click="clearCode" class="clear-button">Clear</button>
          <button @click="resetCode" class="reset-button">Reset</button>
        </div>
        <CodeEditor v-model="code" @update:code="updateCode" />
      </div>
      <div class="terminal-section">
        <h3>Terminal natijasi</h3>
        <Terminal :output="output" :isLoading="isLoading" @clear="clearOutput" />
      </div>
    </div>
  </div>
</template>

<script>
import CodeEditor from '../components/Terminal/CodeEditor.vue';
import Terminal from '../components/Terminal/Terminal.vue';
import axios from 'axios';

export default {
  components: {
    CodeEditor,
    Terminal
  },
  data() {
    return {
      a:2,
      b:3,
      // code: `// JavaScript kodini yozing\nconsole.log("Salom, dunyo!");\n\n// Misol: sonlarni qo'shish\nconst a = 5;\nconst b = 10;\nconsole.log(\`${a} + ${b} = ${a + b}\`);\n\n// Funksiya yaratish\nfunction karraLash(x, y) {\n  return x * y;\n}\n\nconsole.log(\`3 * 7 = ${karraLash(3, 7)}\`);`,
      code: `// JavaScript kodini yozing\nconsole.log("Salom, dunyo!");`,
      isLoading: false
    };
  },
  methods: {
    updateCode(newCode) {
      this.code = newCode;
    },
    async runCode() {
      this.isLoading = true;
      try {
        const response = await axios.post('http://localhost:3000/api/run-code', {
          code: this.code
        });
        
        this.output = response.data.output;
      } catch (error) {
        this.output = [{
          type: 'error',
          content: error.response?.data?.error || 'Xatolik yuz berdi'
        }];
      } finally {
        this.isLoading = false;
      }
    },
    clearCode() {
      this.code = '';
    },
    resetCode() {
      this.code = `// JavaScript kodini yozing\nconsole.log("Salom, dunyo!");\n\n// Misol: sonlarni qo'shish\nconst a = 5;\nconst b = 10;\nconsole.log(\`${a} + ${b} = ${a + b}\`);\n\n// Funksiya yaratish\nfunction karraLash(x, y) {\n  return x * y;\n}\n\nconsole.log(\`3 * 7 = ${karraLash(3, 7)}\`);`;
    },
    clearOutput() {
      this.output = [];
    }
  }
};
</script>

<style scoped>
.code-playground {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

h3 {
  margin-top: 0;
  color: #444;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.editor-container {
  display: flex;
  gap: 20px;
  height: 500px;
}

.editor-section, .terminal-section {
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #eee;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.run-button {
  background-color: #4CAF50;
  color: white;
}

.run-button:hover {
  background-color: #45a049;
}

.clear-button {
  background-color: #f1f1f1;
  color: #333;
}

.clear-button:hover {
  background-color: #e1e1e1;
}

.reset-button {
  background-color: #2196F3;
  color: white;
}

.reset-button:hover {
  background-color: #0b7dda;
}

.icon {
  font-size: 0.8em;
  margin-left: 5px;
}
</style>