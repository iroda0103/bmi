<template>
    <div class="code-editor-container">
      <div id="code-editor" ref="codeEditor"></div>
    </div>
  </template>
  
  <script>
  import * as monaco from 'monaco-editor';
  
  export default {
    props: {
      modelValue: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        editor: null
      };
    },
    mounted() {
      this.initMonaco();
    },
    beforeUnmount() {
      if (this.editor) {
        this.editor.dispose();
      }
    },
    methods: {
      initMonaco() {
        this.editor = monaco.editor.create(this.$refs.codeEditor, {
          value: this.modelValue,
          language: 'javascript',
          theme: 'vs-dark',
          automaticLayout: true,
          minimap: {
            enabled: true
          },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 2
        });
  
        this.editor.onDidChangeModelContent(() => {
          const value = this.editor.getValue();
          this.$emit('update:modelValue', value);
          this.$emit('update:code', value);
        });
      }
    },
    watch: {
      modelValue(newValue) {
        if (this.editor && newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .code-editor-container {
    flex-grow: 1;
    height: 100%;
    overflow: hidden;
  }
  
  #code-editor {
    height: 100%;
    width: 100%;
  }
  </style>
  