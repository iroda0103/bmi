<!-- VoiceCodeEditor.vue -->
<template>
    <div>
      <h1>Ovozli Kod Muharriri</h1>
      
      <button @click="toggleVoice" :style="{background: isListening ? 'red' : 'green'}">
        {{ isListening ? 'To\'xtatish' : 'Ovozni boshlash' }}
      </button>
      
      <textarea :value="code + interimCode" @input="handleManualInput" rows="15" cols="70"></textarea>
      
      <button @click="executeCode">Kodni Ijro Etish</button>
      
      <div v-if="output">
        <h3>Natija:</h3>
        <pre>{{ output }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        code: '',          // Saqlangan kod
        interimCode: '',   // Ovozni aniqlash davomidagi matn
        output: '',
        isListening: false,
        recognition: null
      };
    },
    methods: {
      toggleVoice() {
        if (!('webkitSpeechRecognition' in window)) {
          alert('Brauzeringiz ovozni qo\'llab-quvvatlamaydi!');
          return;
        }
  
        if (!this.recognition) {
          this.recognition = new webkitSpeechRecognition();
          this.recognition.lang = 'en-US'; // en-US, ru-RU, uz-UZ
          this.recognition.continuous = true;
          this.recognition.interimResults = true; // Davomiy natijalar
  
          this.recognition.onresult = (event) => {
            let final = '';
            let interim = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                final += transcript + ' ';
              } else {
                interim += transcript;
              }
            }
            
            this.code += final;
            this.interimCode = interim;
          };
        }
  
        this.isListening ? this.recognition.stop() : this.recognition.start();
        this.isListening = !this.isListening;
      },
  
      handleManualInput(e) {
        // Qo'lda o'zgartirilganda interimCode ni tozalash
        this.code = e.target.value;
        this.interimCode = '';
      },
  
      async executeCode() {
        try {
          const response = await fetch('http://localhost:3000/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: this.code })
          });
          
          const result = await response.json();
          this.output = result.output || result.message;
        } catch (error) {
          this.output = 'Xatolik: ' + error.message;
        }
      }
    }
  }
  </script>
  
  <style>
  textarea {
    margin: 20px 0;
    padding: 10px;
    font-family: monospace;
  }
  
  button {
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 5px;
  }
  </style>