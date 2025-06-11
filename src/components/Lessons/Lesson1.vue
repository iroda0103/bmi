<template>
  <div class="page">
    <div class="container">
      <router-link :to="`/courses/${courseId}`" class="back-button">
        <i class="fas fa-arrow-left"></i>
        <--
      </router-link>

      <div class="grid">
        <!-- Dars mazmuni -->
        <div class="left-column">
          <div class="leeson-card">
            <div class="leeson-card-header">
              <h2>{{ lesson.title }}</h2>
            </div>
            <div class="leeson-card-content">
              <div v-html="convertedContent(les)" class="lesson-content" v-for="les, i in lesson.blocks" :key="i"></div>
            </div>
          </div>
        </div>

        <!-- Kod editoru -->
        <div class="right-column">
          <div class="leeson-card">
            <div class="leeson-card-header flex-between">
              <h2 class="leeson-card__header">Kod editori</h2>
              <div class="btn-group">
                <button class="outline-btn" @click="resetEditor">
                  <i class="fas fa-undo"></i> Tozalash
                </button>
                <button class="run-btn" :disabled="isRunning || !code.trim()" @click="runCode">
                  <i class="fas fa-play"></i> {{ isRunning ? 'Bajarilmoqda...' : 'Ishga tushirish' }}
                </button>
              </div>
            </div>
            <div class="leeson-card-content">
              <textarea v-model="code" placeholder="Bu yerga JavaScript kodingizni yozing..." class="editor"></textarea>
            </div>
          </div>

          <div class="leeson-card">
            <div class="leeson-card-header">
              <h3>Natija</h3>
            </div>
            <div class="leeson-card-content result-box">
              <pre>{{ output || 'Kodni ishga tushiring va natijani bu yerda ko\'ring...' }}</pre>
            </div>
          </div>
        </div>

        <div class="leeson-card">
          <div class="leeson-card-header">
            <h3>Misollar</h3>
          </div>
          <div class="leeson-card-content">
            <div v-for="(example, index) in lesson.examples" :key="index" class="example-box">
              <h4>{{ example.title }}</h4>
              <pre><code>{{ example.code }}</code></pre>
              <button class="outline-btn" @click="loadExample(example.code)">Editorga yuklash</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = route.params.courseId
const lessonId = route.params.lessonId

const lessonData = {
  'javascript-basics': {
    1: {
      title: 'JavaScript ga kirish',
      blocks: [{
        type: 'text', content: `
# JavaScript ga kirish

JavaScript - bu veb-sahifalarni interaktiv qilish uchun ishlatiladigan dasturlash tili.

## Asosiy xususiyatlari:
- **Dinamik tipizatsiya**: O'zgaruvchilar turini oldindan belgilash shart emas
- **Interpretatsiya qilinadigan til**: Kodni to'g'ridan-to'g'ri bajarish mumkin
- **Obyektga yo'naltirilgan**: Obyektlar va klasslar bilan ishlash

## Birinchi dastur

Eng oddiy JavaScript dasturi:
 
`}, {
        type: 'code', content: "console.log('Salom, Dunyo!');"
      },
      {
        type: 'text', content: `
        Bu kod brauzer konsolida "Salom, Dunyo!" xabarini chiqaradi.`
      }],
      examples: [
        {
          title: 'Oddiy xabar chiqarish',
          code: `console.log("Salom, JavaScript!");
console.log("Men JavaScript o'rganmoqdaman");`,
        },
        {
          title: 'Matematik amallar',
          code: `console.log(5 + 3);
console.log(10 - 4);
console.log(6 * 7);
console.log(15 / 3);`,
        },
      ],
    },
  },
}

//const lesson = lessonData[courseId]?.[parseInt(lessonId)]
const lesson = lessonData['javascript-basics'][1]
const code = ref('')
const output = ref('')
const isRunning = ref(false)

const convertedContent = (item) => {
  // item.content = String(item.type == 'code' ? `
  // \`\`\`javascript
  // ${item.content} \`\`\`` : item.content)
  item.content = item.content.replace(/\n/g, '<br>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
  if (item.type === 'heading') {
    return `<h2>${item.content}</h2>`
  } else if (item.type === 'text') {
    return `${item.content}`
  } else if (item.type === 'code') {
    return `<pre><code>${formatCode(item)}</code></pre>`
  }
  // return item.content
  //   .replace(/\n/g, '<br>')
  //   .replace(/`([^`]+)`/g, '<code>$1</code>')
}

const formatCode = (item) => {
  return item.content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/\n/g, '<br>')
}

function runCode() {
  isRunning.value = true
  output.value = ''

  try {
    const logs = []
    const originalLog = console.log
    console.log = (...args) => {
      logs.push(args.map(String).join(' '))
    }

    const result = eval(code.value)
    console.log = originalLog

    let out = logs.join('\n')
    if (result !== undefined && logs.length === 0) {
      out = String(result)
    }

    output.value = out || 'Kod muvaffaqiyatli bajarildi'
  } catch (err) {
    output.value = `Xato: ${err instanceof Error ? err.message : String(err)}`
  } finally {
    isRunning.value = false
  }
}

function loadExample(exampleCode) {
  code.value = exampleCode
  output.value = ''
}

function resetEditor() {
  code.value = ''
  output.value = ''
}
</script>

<style>
/* Umumiy */
.page {
  background: #f9fafb;
  min-height: 100vh;
  /* padding: 40px 20px; */
  font-family: sans-serif;
}

.container {
  max-width: 1200px;
  margin: auto;
}

.back-button {
  display: inline-flex;
  align-items: start;
  gap: 8px;
  margin-bottom: 4px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 16px;
  text-align: start;
}
  
.grid {
  display: grid;
  grid-template-columns: 5fr 4fr;
  gap: 20px;
  color: #333;

}

.left-column {
  flex: 1 1 50%;
  min-width: 300px;
}

.left-column .leeson-card {
  height: 100%;
}

.right-column {
  display: flex;
  flex-direction: column;
  flex: 1 1 50%;
  min-width: 300px;
  gap: 20px;
}

/* Karta */
.leeson-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  /* margin-bottom: 20px; */
  overflow: hidden;
  padding: 20px;
}

.leeson-card-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  background: #f4f4f4;
}

.leeson-card-header.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.leeson-card__header {
  font-weight: 500;

}

.leeson-card-content {
  padding: 16px;
}

/* Misollar */
.example-box {
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
}

.example-box pre {
  background: #f3f3f3;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
  margin-bottom: 15px;

}

/* Tugmalar */
.btn-group {
  display: flex;
  gap: 10px;
}

.outline-btn,
.run-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

.outline-btn:hover {
  background: #eee;
}

.run-btn {
  background: #2c974b;
  color: white;
  border: none;
  background: linear-gradient(90deg, #0f0, #000F00);
  background-clip: border-box;
  background-clip: border-box;
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}

.run-btn:hover {
  background: #267f3c;
}

/* Editor */
.editor {
  width: 100%;
  height: 160px;
  font-family: monospace;
  font-size: 14px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
}

/* Natija */
.result-box pre {
  background: #222;
  color: #0f0;
  padding: 10px;
  border-radius: 6px;
  min-height: 100px;
  overflow-x: auto;
}

.lesson-content code {
  background: #eee;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
