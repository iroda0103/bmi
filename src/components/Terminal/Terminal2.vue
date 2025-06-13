<template>
    <div class="container terminal-page">
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
                <textarea v-model="code" placeholder="Bu yerga JavaScript kodingizni yozing..."
                    class="editor"></textarea>
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
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const code = ref('')
const output = ref('')
const isRunning = ref(false)


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

<style scoped>
.leeson-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    padding: 20px;
    margin-bottom: 20px;
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

.result-box pre {
    background: #222;
    color: #0f0;
    padding: 10px;
    border-radius: 6px;
    min-height: 165px;
    overflow-x: auto;
}

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
    background: linear-gradient(90deg, #0f0, #000F00);
    color: white;
    border: none;
}

.run-btn:hover {
    background: #267f3c;
}

.terminal-page{
    /* padding: 20px; */
    margin-top: 80px;
    margin-bottom: 70px;
    /* max-width: 800px; */
    display: flex;
    gap: 20px;
    justify-content: center;
}

.leeson-card:nth-child(n) {
   width: 500px;
   align-items: center;
   /* display: flex; */
}

.leeson-card-content textarea{
    margin: 0;
}
</style>
