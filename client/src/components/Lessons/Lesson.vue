<template>
  <div class="lesson-container">
    <div class="lessons-sidebar">
      <h2>Darslar</h2>
      <ul class="lessons-list">
        <li v-for="(lesson, index) in lessons" :key="index" :class="{ active: selectedLessonIndex === index }"
          @click="selectLesson(index)">
          {{ lesson.title }}
        </li>
      </ul>
      <button class="add-lesson-btn" v-if="isAuthor" @click="addNewLesson">
        + Yangi dars qo'shish
      </button>
    </div>

    <div class="lesson-content">
      <div v-if="selectedLesson" class="editor-container">
        <!-- <h1 class="gradient-title">{{ selectedLesson.title }}</h1> -->

        <div v-if="isAuthor" class="toolbar">
          <button @click="addTextBlock">Matn blok</button>
          <button @click="addHeadingBlock">Sarlavha</button>
          <button @click="addCodeBlock">Kod blok</button>
          <button @click="saveLesson" class="save-btn">Saqlash</button>
        </div>

        <div class="blocks-container">
          <div v-for="(block, index) in selectedLesson.blocks" :key="index" class="block-wrapper">
            <TextBlock v-if="block.type === 'text'" :content="block.content" :readonly="!isAuthor"
              @update:content="updateBlockContent(index, $event)" />
            <HeadingBlock v-if="block.type === 'heading'" :content="block.content" :readonly="!isAuthor"
              @update:content="updateBlockContent(index, $event)" />
            <RunableCodeBlock v-if="block.type === 'code'" :content="block.content" :language="block.language"
              :readonly="!isAuthor" @update:content="updateBlockContent(index, $event)"
              @update:language="updateBlockLanguage(index, $event)" />
            <button v-if="isAuthor" class="delete-btn" @click="deleteBlock(index)">❌</button>
          </div>
        </div>
      </div>
      <div v-else class="no-lesson-selected">
        Darsni tanlang
      </div>
    </div>
  </div>
</template>

<script>
import TextBlock from './TextBlock.vue';
import HeadingBlock from '../Editor/EditorHead.vue';
import RunableCodeBlock from './CodeBlock.vue';

export default {
  components: {
    TextBlock,
    HeadingBlock,
    RunableCodeBlock
  },
  props: {
    isAuthor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedLessonIndex: 0,
      lessons: [
        {
          id: 1,
          title: 'JavaScript asoslari',
          blocks: [
            { type: 'heading', content: 'JavaScript asoslari' },
            { type: 'text', content: 'Bu darsda JavaScript asoslarini o\'rganamiz.' },
            {
              type: 'code',
              content: '// Oddiy JavaScript kod\nconsole.log("Salom dunyo!");\n\n// O\'zgaruvchilar\nlet ism = "Anvar";\nconst yosh = 25;\n\n// Matnni ekranga chiqarish\ndocument.getElementById("natija").innerHTML = `Salom, ${ism}!`;',
              language: 'javascript'
            },
            { type: 'text', content: 'JavaScript dasturlash tili veb-sahifalarni jonli va interaktiv qilish uchun ishlatiladi.' }
          ]
        },
        {
          id: 2,
          title: 'HTML asoslari',
          blocks: [
            { type: 'heading', content: 'HTML asoslari' },
            { type: 'text', content: 'HTML (HyperText Markup Language) veb-sahifalar yaratish uchun ishlatiladigan belgilash tili.' },
            {
              type: 'code',
              content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Birinchi HTML sahifam</title>\n</head>\n<body>\n  <h1>Salom dunyo!</h1>\n  <p>Bu mening birinchi HTML sahifam</p>\n  <div id="natija"></div>\n</body>\n</html>',
              language: 'html'
            }
          ]
        },
        {
          id: 3,
          title: 'CSS asoslari',
          blocks: [
            { type: 'heading', content: 'CSS asoslari' },
            { type: 'text', content: 'CSS (Cascading Style Sheets) veb-sahifalarni bezatish uchun ishlatiladi.' },
            {
              type: 'code',
              content: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  background: white;\n  padding: 20px;\n  border-radius: 5px;\n  box-shadow: 0 0 10px rgba(0,0,0,0.1);\n}',
              language: 'css'
            }
          ]
        }
      ]
    };
  },
  computed: {
    selectedLesson() {
      return this.lessons[this.selectedLessonIndex];
    }
  },
  methods: {
    selectLesson(index) {
      this.selectedLessonIndex = index;
    },
    addNewLesson() {
      const newId = Math.max(...this.lessons.map(l => l.id), 0) + 1;
      this.lessons.push({
        id: newId,
        title: 'Yangi dars',
        blocks: [
          { type: 'heading', content: 'Yangi dars' },
          { type: 'text', content: 'Dars tafsilotlarini kiriting...' }
        ]
      });
      this.selectedLessonIndex = this.lessons.length - 1;
    },
    addTextBlock() {
      this.selectedLesson.blocks.push({ type: 'text', content: 'Matn kiriting...' });
    },
    addHeadingBlock() {
      this.selectedLesson.blocks.push({ type: 'heading', content: 'Yangi sarlavha' });
    },
    addCodeBlock() {
      this.selectedLesson.blocks.push({
        type: 'code',
        content: '// Kod yozing',
        language: 'javascript'
      });
    },
    updateBlockContent(index, newContent) {
      this.selectedLesson.blocks[index+1].content = newContent;
    },
    updateBlockLanguage(index, language) {
      this.selectedLesson.blocks[index+1].language = language;
    },
    deleteBlock(index) {
      this.selectedLesson.blocks.splice(index, 1);
    },
    saveLesson() {
      // Backend serverga saqlash uchun so'rov yuborish
      console.log('Dars saqlandi:', JSON.stringify(this.selectedLesson));

      // Real qo'llanishda:
      // axios.post('/api/lessons/' + this.selectedLesson.id, this.selectedLesson)
      //   .then(response => alert('Dars muvaffaqiyatli saqlandi!'))
      //   .catch(error => console.error('Darsni saqlashda xatolik', error));
    }
  }
};
</script>

<style>
.lesson-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 600px;
  box-shadow: -6px 0px 34px 12px rgba(251, 251, 251, 0.2);
border-radius: 10px;
}

.lessons-sidebar {
  width: 250px;
  padding: 20px;
  border-right: 1px solid #c0ebd0;
  box-shadow: 2px 0px 10px rgba(109, 253, 104, 0.15);
}

.lessons-sidebar h2 {
  background: linear-gradient(90deg, #00cc00, #00cccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
}

.lessons-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lessons-list li {
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f0fff5;
  color: #2c8a5c;
  border-left: 3px solid transparent;
}

.lessons-list li:hover {
  background-color: #e0ffe8;
  border-left: 3px solid #00cc00;
}

.lessons-list li.active {
  background-color: #c8ffd6;
  border-left: 3px solid #00cccc;
  font-weight: bold;
  box-shadow: 0px 3px 10px rgba(109, 253, 104, 0.2);
}

.lesson-content {
  flex: 1;
  padding: 30px;
}

.gradient-title {
  background: linear-gradient(90deg, #00cc00, #00cccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2em;
}

.editor-container {
  /* max-width: 800px; */
  margin: 0 auto;
  position: relative;
}

.toolbar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  padding: 12px;
  background-color: #e8ffee;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(109, 253, 104, 0.15);
}

.toolbar button {
  padding: 10px 18px;
  background: linear-gradient(45deg, #54db70, #6ae9c3);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.toolbar button:hover {
  background: linear-gradient(45deg, #45cc61, #57dbb0);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(109, 253, 104, 0.3);
}

.save-btn {
  margin-left: auto;
  background: linear-gradient(45deg, #00cc00, #00cccc) !important;
  color: white;
  font-weight: bold !important;
}

.save-btn:hover {
  background: linear-gradient(45deg, #00bb00, #00bbbb) !important;
}

.block-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.delete-btn {
  position: absolute;
  right: -40px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s ease;
  font-size: 16px;
}

.delete-btn:hover {
  opacity: 1;
  color: #ff4040;
}

.no-lesson-selected {
  text-align: center;
  margin-top: 100px;
  color: #6dfd68;
  font-size: 1.5em;
  opacity: 0.7;
}

.add-lesson-btn {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: linear-gradient(90deg, #00cc00, #00cccc);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(109, 253, 104, 0.3);
}

.add-lesson-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(90deg, #00bb00, #00bbbb);
  box-shadow: 0 6px 15px rgba(109, 253, 104, 0.4);
}
</style>