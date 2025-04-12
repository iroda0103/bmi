<template>
    <div class="code-block">
      <div class="code-toolbar">
        <select @change="updateLanguage" v-model="selectedLanguage">
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>
      <pre><code :class="`language-${selectedLanguage}`" ref="codeElement">{{ content }}</code></pre>
      <textarea 
        ref="codeEditor"
        class="code-editor"
        @input="updateContent"
        v-model="localContent"
      ></textarea>
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
      }
    },
    data() {
      return {
        localContent: this.content,
        selectedLanguage: this.language
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
  .code-block {
    position: relative;
    margin: 10px 0;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .code-toolbar {
    background-color: #2d2d2d;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
  
  .code-toolbar select {
    padding: 5px;
    border-radius: 3px;
    border: none;
    background-color: #3c3c3c;
    color: white;
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
  </style>
  