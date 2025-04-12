<template>
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-title">Terminal</div>
        <button @click="$emit('clear')" class="terminal-clear">Clear</button>
      </div>
      <div class="terminal-content" ref="terminalContent">
        <div v-if="isLoading" class="loading">
          <span class="loading-text">Kod bajarilmoqda...</span>
          <div class="spinner"></div>
        </div>
        <template v-else>
          <div v-if="output.length === 0" class="empty-message">
            Natija bu yerda ko'rsatiladi
          </div>
          <div v-for="(item, index) in output" :key="index" :class="['output-line', item.type]">
            {{ item.content }}
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      output: {
        type: Array,
        default: () => []
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      output() {
        this.$nextTick(() => {
          if (this.$refs.terminalContent) {
            this.$refs.terminalContent.scrollTop = this.$refs.terminalContent.scrollHeight;
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .terminal {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: #1e1e1e;
    color: #fff;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    overflow: hidden;
  }
  
  .terminal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
    border-bottom: 1px solid #444;
  }
  
  .terminal-title {
    font-weight: bold;
  }
  
  .terminal-clear {
    background-color: transparent;
    color: #ccc;
    border: 1px solid #555;
    padding: 3px 8px;
    font-size: 12px;
    cursor: pointer;
  }
  
  .terminal-clear:hover {
    background-color: #444;
  }
  
  .terminal-content {
    flex-grow: 1;
    padding: 10px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .output-line {
    margin-bottom: 4px;
    line-height: 1.4;
  }
  
  .output-line.log {
    color: #ddd;
  }
  
  .output-line.info {
    color: #58B7FF;
  }
  
  .output-line.warn {
    color: #F7BA2A;
  }
  
  .output-line.error {
    color: #FF5252;
  }
  
  .empty-message {
    color: #666;
    font-style: italic;
    text-align: center;
    margin-top: 20px;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .loading-text {
    color: #ddd;
    margin-bottom: 10px;
  }
  
  .spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  </style>
  