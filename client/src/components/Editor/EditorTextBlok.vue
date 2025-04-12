<template>
    <div class="text-block">
      <div class="format-toolbar" v-if="showToolbar" >
        <button @click="applyFormat('bold')" :class="{ active: hasFormat('bold') ,bold} ">B</button>
        <button @click="applyFormat('italic')" :class="{ active: hasFormat('italic') }">I</button>
      </div>
      <div 
        class="editable-content" 
        contenteditable="true" 
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
        this.showToolbar=true

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
    padding: 10px;
    border-radius: 4px;
    padding-top: 30px;
    position: relative;
  }
  
  .text-block:hover {
    border-color: #eee;
  }
  
  .format-toolbar {
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #f5f5f5;
    border-radius: 4px;
    position: absolute;
    top: 0;
    right: 0;
  }
  
  .format-toolbar button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .format-toolbar button.active {
    background-color: #e1e1e1;
  }
  
  .editable-content {
    min-height: 30px;
    outline: none;
  }
  .blod{
    font-weight: bold;
  }
  </style>