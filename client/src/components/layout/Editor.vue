<template>
    <div v-if="editor">
      <!-- Formatlash tugmalari -->
      <button @click="editor.chain().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Bold
      </button>
      <button @click="editor.chain().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      
      <!-- Blok tanlovi -->
      <select @change="changeBlockType($event.target.value)">
        <option value="paragraph">Paragraph</option>
        <option value="heading">Heading</option>
        <option value="code">Code</option>
      </select>
  
      <!-- Editor kontenti -->
      <editor-content :editor="editor" />
    </div>
  </template>
  
  <script setup>
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Code from '@tiptap/extension-code'
  import Bold from '@tiptap/extension-bold'
  import Italic from '@tiptap/extension-italic'
  
  const editor = useEditor({
    content: '',
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'code-block',
        },
      }),
      Bold,
      Italic,
    ],
  })
  
  const changeBlockType = (type) => {
    if (type === 'code') {
      editor.value.chain().toggleCodeBlock().run()
    } else if (type === 'heading') {
      editor.value.chain().toggleHeading({ level: 2 }).run()
    } else {
      editor.value.chain().setParagraph().run()
    }
  }
  </script>
  
  <style>
  /* Stil sozlamalari */
  .ProseMirror {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .code-block {
    font-family: monospace;
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
  }
  
  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }
  </style>