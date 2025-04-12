<template>
    <div class="chat-wrapper">
        <div class="chat-container">
            <h2 class="title">OpenRouter Chat</h2>

            <div class="chat-space">
                <!-- <div class="giff-wrapper">        <img src="../../assets/smile.gif">
                </div> -->
                <textarea v-model="prompt" placeholder="Savol yozing..." class="input-field" rows="3"></textarea>
                <!-- class="enroll-button" -->
                <button @click="askAI" :disabled="loading || !prompt.trim()" class="submit-btn">
                    {{ loading ? 'Yuborilmoqda...' : 'Yuborish' }}
                </button>

                <div v-if="answer" class="answer-box">
                    <div class="answer-header">AI javobi:</div>
                    <p class="answer-text">{{ answer }}</p>
                </div>
            </div>

        </div>
        
    </div>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const prompt = ref('')
const answer = ref('')
const loading = ref(false)

const askAI = async () => {
    if (!prompt.value.trim()) return
    loading.value = true
    answer.value = ''

    try {
        const res = await axios.post('http://localhost:3000/ask', {
            prompt: prompt.value
        })
        answer.value = res.data.answer
    } catch (err) {
        answer.value = 'Xatolik yuz berdi: ' + (err.response?.data?.error || err.message)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
textarea {
    resize: vertical;
}
</style>

<style scoped>
.chat-container {
    max-width: 42rem;
    margin: 2rem auto;
    padding: 2rem;
    /* background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%); */
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1e293b;
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
    padding-bottom: 0.5rem;
}

.title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #3b82f6;
    border-radius: 2px;
}

.chat-space {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
}

.input-field {
    width: 100%;
    padding: 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #1e293b;
    transition: all 0.3s ease;
    background: white;
}

.input-field:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field::placeholder {
    color: #94a3b8;
}

.submit-btn {
    padding: 0.875rem 1.75rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: flex-end;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
}

.answer-box {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.75rem;
    border-left: 4px solid #3b82f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.answer-header {
    font-size: 0.875rem;
    font-weight: 600;
    color: #3b82f6;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.answer-text {
    font-size: 1rem;
    line-height: 1.6;
    color: #334155;
    white-space: pre-wrap;
}

@media (max-width: 640px) {
    .container {
        margin: 1rem;
        padding: 1.5rem;
    }

    .title {
        font-size: 1.5rem;
    }
}

.giff-wrapper{
    display: inline-block;
    background-color: #fff;
}

.giff-wrapper img{
    width: 70px;
    position: absolute;
    top: 160px;
right: 0;
}
</style>