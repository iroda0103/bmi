<template>
    <div class="heading-block">
      <div 
        class="editable-heading" 
        contenteditable="true"
        :contenteditable="!readonly"
        @input="updateContent"
        ref="editableHeading"
        v-html="content"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        default: 'Sarlavha'
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      updateContent(e) {
        this.$emit('update:content', e.target.innerHTML);
      }
    }
  };
  </script>
  
  <style>
  .heading-block {
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #f0fff5;
    box-shadow: 0 3px 10px rgba(109, 253, 104, 0.1);
    transition: all 0.3s ease;
  }
  
  .heading-block:hover {
    border-color: #c0ebd0;
    background-color: #e8ffee;
    box-shadow: 0 5px 15px rgba(109, 253, 104, 0.2);
  }
  
  .editable-heading {
    font-size: 1.8em;
    font-weight: bold;
    min-height: 40px;
    outline: none;
    background: linear-gradient(90deg, #009900, #009999);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  </style>
  