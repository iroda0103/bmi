<template>
    <div class="editor-container">
      <h1>Dars qo'shish</h1>
      <div class="toolbar">
        <button @click="addTextBlock">Text blok</button>
        <button @click="addHeadingBlock">Sarlavha</button>
        <button @click="addCodeBlock">Kod blok</button>
      </div>
      <div class="blocks-container">
        <div v-for="(block, index) in blocks" :key="index" class="block-wrapper">
          <TextBlock 
            v-if="block.type === 'text'" 
            :content="block.content" 
            @update:content="updateBlockContent(index, $event)" 
          />
          <HeadingBlock 
            v-if="block.type === 'heading'" 
            :content="block.content" 
            @update:content="updateBlockContent(index, $event)" 
          />
          <CodeBlock 
            v-if="block.type === 'code'" 
            :content="block.content" 
            :language="block.language" 
            @update:content="updateBlockContent(index, $event)"
            @update:language="updateBlockLanguage(index, $event)" 
          />
          <button class="delete-btn" @click="deleteBlock(index)">❌</button>
        </div>
      </div>
      <button class="save-btn" @click="saveDocument">Saqlash</button>
    </div>
  </template>
  
  <script>
  import TextBlock from '../components/Editor/EditorTextBlok.vue';
  import HeadingBlock from '../components/Editor/EditorHead.vue';
  import CodeBlock from '../components/Editor/EditorCodeBlock.vue';
  
  export default {
    components: {
      TextBlock,
      HeadingBlock,
      CodeBlock
    },
    data() {
      return {
        blocks: [
          { type: 'heading', content: 'Yangi hujjat' },
          { type: 'text', content: 'Matn kiriting...' }
        ]
      };
    },
    methods: {
      addTextBlock() {
        this.blocks.push({ type: 'text', content: 'Matn kiriting...' });
      },
      addHeadingBlock() {
        this.blocks.push({ type: 'heading', content: 'Yangi sarlavha' });
      },
      addCodeBlock() {
        this.blocks.push({ 
          type: 'code', 
          content: '// Kod yozing', 
          language: 'javascript' 
        });
      },
      updateBlockContent(index, newContent) {
        this.blocks[index].content = newContent;
      },
      updateBlockLanguage(index, language) {
        this.blocks[index].language = language;
      },
      deleteBlock(index) {
        this.blocks.splice(index, 1);
      },
      saveDocument() {
        const documentData = JSON.stringify(this.blocks);
        // Backend serverga saqlash uchun so'rov yuborish
        console.log('Document saved:', documentData);
        
        // Real qo'llanishda:
        // axios.post('/api/documents', { content: documentData })
        //   .then(response => console.log('Saved!', response))
        //   .catch(error => console.error('Error saving document', error));
      }
    }
  };
  </script>
  
  <style scoped>
  .editor-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  .toolbar {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  
  .toolbar button {
    padding: 8px 15px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .toolbar button:hover {
    background-color: #e1e1e1;
  }
  
  .block-wrapper {
    position: relative;
    margin-bottom: 10px;
  }
  
  .delete-btn {
    position: absolute;
    right: -30px;
    top: 5px;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.3;
  }
  
  .delete-btn:hover {
    opacity: 1;
  }
  
  .save-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .save-btn:hover {
    background-color: #45a049;
  }
  </style>