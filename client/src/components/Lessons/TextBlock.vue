<template>
    <div class="text-block">
      <div class="format-toolbar" v-if="showToolbar && !readonly">
        <button @click="applyFormat('bold')" :class="{ active: hasFormat('bold') }">B</button>
        <button @click="applyFormat('italic')" :class="{ active: hasFormat('italic') }">I</button>
      </div>
      <div 
        class="editable-content" 
        contenteditable="true" 
        :contenteditable="!readonly"
        @input="updateContent"
        @focus="showToolbar = true"
        @blur="showToolbar = false"
        ref="editableDiv"
        v-html="content"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showToolbar: false
      };
    },
    methods: {
      updateContent(e) {
        this.$emit('update:content', e.target.innerHTML);
      },
      applyFormat(format) {
        document.execCommand(format, false);
        this.$refs.editableDiv.focus();
      },
      hasFormat(format) {
        return document.queryCommandState(format);
      }
    }
  };
  </script>
  
  <style>
  .text-block {
    border: 1px solid transparent;
    padding: 15px;
    border-radius: 10px;
    transition: all 0.3s ease;
    background-color: #f9fffa;
    box-shadow: 0 3px 10px rgba(109, 253, 104, 0.1);
  }
  
  .text-block:hover {
    border-color: #c0ebd0;
    background-color: #f0fff5;
    box-shadow: 0 5px 15px rgba(109, 253, 104, 0.2);
  }
  
  .format-toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    padding: 8px;
    background-color: #e8ffee;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(109, 253, 104, 0.15);
  }
  
  .format-toolbar button {
    width: 35px;
    height: 35px;
    border: none;
    background: linear-gradient(45deg, #54db70, #6ae9c3);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .format-toolbar button:hover {
    background: linear-gradient(45deg, #45cc61, #57dbb0);
    transform: translateY(-2px);
  }
  
  .format-toolbar button.active {
    background: linear-gradient(45deg, #00cc00, #00cccc);
    box-shadow: 0 2px 5px rgba(0, 204, 204, 0.3);
  }
  
  .editable-content {
    min-height: 40px;
    outline: none;
    line-height: 1.6;
    color: #333;
    padding: 5px;
    border-radius: 5px;
  }
  
  .editable-content:focus {
    background-color: #ffffff;
  }
  </style>