<template>
  <div class="problems-container">
    <!-- <div class="header">
      <h1>Algoritm Masalalari</h1>
      <p class="subtitle">Dasturlash ko'nikmalaringizni rivojlantiring</p>
    </div> -->

    <div class="filters">
      <div class="filter-group">
        <label>Qiyinlik darajasi:</label>
        <select v-model="selectedDifficulty" @change="filterProblems">
          <option value="all">Hammasi</option>
          <option value="easy">Oson</option>
          <option value="medium">O'rtacha</option>
          <option value="hard">Qiyin</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Mavzu:</label>
        <select v-model="selectedTopic" @change="filterProblems">
          <option value="all">Hammasi</option>
          <option value="recursion">Rekursiya</option>
          <option value="arrays">Massivlar</option>
          <option value="strings">Satrlar</option>
          <option value="sorting">Saralash</option>
          <option value="math">Matematik</option>
        </select>
      </div>

      <div class="search-group">
        <input 
          v-model="searchQuery" 
          @input="filterProblems"
          type="text" 
          placeholder="Masala qidirish..."
          class="search-input"
        >
      </div>
    </div>

    <div class="problems-grid">
      <div 
        v-for="problem in filteredProblems" 
        :key="problem.id"
        class="problem-card"
        :class="[
          `difficulty-${problem.difficulty}`,
          { 'completed': problem.completed }
        ]"
        @click="selectProblem(problem)"
      >
        <div class="problem-header">
          <h3>{{ problem.title }}</h3>
          <div class="problem-meta">
            <span class="difficulty-badge" :class="`badge-${problem.difficulty}`">
              {{ getDifficultyText(problem.difficulty) }}
            </span>
            <span class="topic-badge">{{ getTopicText(problem.topic) }}</span>
          </div>
        </div>

        <div class="problem-description">
          <p>{{ problem.shortDescription }}</p>
        </div>

        <div class="problem-stats">
          <div class="stat">
            <span class="stat-label">Hal qilganlar:</span>
            <span class="stat-value">{{ problem.solvedCount }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Vaqt:</span>
            <span class="stat-value">{{ problem.timeLimit }}</span>
          </div>
        </div>

        <div class="problem-footer">
          <div class="problem-tags">
            <span v-for="tag in problem.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <div class="problem-status">
            <span v-if="problem.completed" class="status-completed">✓ Bajarildi</span>
            <span v-else class="status-pending">Kutilmoqda</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredProblems.length === 0" class="no-results">
      <h3>Hech qanday masala topilmadi</h3>
      <p>Qidiruv shartlarini o'zgartiring yoki filtrlarni tozalang.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemsListComponent',
  data() {
    return {
      selectedDifficulty: 'all',
      selectedTopic: 'all',
      searchQuery: '',
      filteredProblems: [],
      
      problems: [
        {
          id: 1,
          title: 'Fibonacci Sonlari',
          shortDescription: 'Fibonacci ketma-ketligining n-chi elementini toping.',
          difficulty: 'easy',
          topic: 'recursion',
          tags: ['rekursiya', 'matematik'],
          solvedCount: 1245,
          timeLimit: '1s',
          completed: false,
          fullDescription: `<p>Fibonacci sonlar ketma-ketligining n-chi sonini topadigan funksiya yozing.</p>
                <p>Fibonacci ketma-ketligi quyidagicha aniqlanadi:</p>
                <ul>
                  <li>F(0) = 0</li>
                  <li>F(1) = 1</li>
                  <li>F(n) = F(n-1) + F(n-2), n > 1</li>
                </ul>
                <p><strong>Vazifa:</strong> <code>fibonacci(n)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'fibonacci(0)', output: '0' },
            { input: 'fibonacci(1)', output: '1' },
            { input: 'fibonacci(5)', output: '5' },
            { input: 'fibonacci(10)', output: '55' }
          ],
          testCases: [
            { input: 0, expected: 0 },
            { input: 1, expected: 1 },
            { input: 2, expected: 1 },
            { input: 5, expected: 5 },
            { input: 10, expected: 55 },
            { input: 15, expected: 610 }
          ],
          initialCode: {
            javascript: `function fibonacci(n) {\n  // Kodingizni shu yerga yozing\n\n}`,
            python: `def fibonacci(n):\n  # Kodingizni shu yerga yozing\n  pass`,
            java: `public class Solution {\n  public static int fibonacci(int n) {\n    // Kodingizni shu yerga yozing\n    return 0;\n  }\n}`,
            cpp: `#include <iostream>\n\nint fibonacci(int n) {\n  // Kodingizni shu yerga yozing\n  return 0;\n}`
          }
        },
        {
          id: 2,
          title: 'Palindrom Tekshirish',
          shortDescription: 'Berilgan satr palindrom ekanligini tekshiring.',
          difficulty: 'easy',
          topic: 'strings',
          tags: ['satr', 'palindrom'],
          solvedCount: 2341,
          timeLimit: '1s',
          completed: true,
          fullDescription: `<p>Berilgan satr palindrom ekanligini tekshiradigan funksiya yozing.</p>
                <p>Palindrom - oldinga va orqaga bir xil o'qiladigan satr.</p>
                <p><strong>Vazifa:</strong> <code>isPalindrome(s)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'isPalindrome("racecar")', output: 'true' },
            { input: 'isPalindrome("hello")', output: 'false' },
            { input: 'isPalindrome("a")', output: 'true' }
          ],
          testCases: [
            { input: "racecar", expected: true },
            { input: "hello", expected: false },
            { input: "a", expected: true },
            { input: "madam", expected: true },
            { input: "race", expected: false }
          ]
        },
        {
          id: 3,
          title: 'Massivdagi Maksimal Element',
          shortDescription: 'Berilgan massivdagi eng katta elementni toping.',
          difficulty: 'easy',
          topic: 'arrays',
          tags: ['massiv', 'qidiruv'],
          solvedCount: 3456,
          timeLimit: '1s',
          completed: false,
          fullDescription: `<p>Berilgan sonlar massivida eng katta elementni topadigan funksiya yozing.</p>
                <p><strong>Vazifa:</strong> <code>findMax(arr)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'findMax([1, 3, 2, 8, 5])', output: '8' },
            { input: 'findMax([-1, -3, -2])', output: '-1' },
            { input: 'findMax([42])', output: '42' }
          ],
          testCases: [
            { input: [1, 3, 2, 8, 5], expected: 8 },
            { input: [-1, -3, -2], expected: -1 },
            { input: [42], expected: 42 },
            { input: [10, 20, 30, 40], expected: 40 }
          ]
        },
        {
          id: 4,
          title: 'Faktorial Hisoblash',
          shortDescription: 'Berilgan sonning faktorialini hisoblang.',
          difficulty: 'easy',
          topic: 'math',
          tags: ['matematik', 'rekursiya'],
          solvedCount: 2876,
          timeLimit: '1s',
          completed: false,
          fullDescription: `<p>Berilgan sonning faktorialini hisoblaydigan funksiya yozing.</p>
                <p>Faktorial: n! = n × (n-1) × (n-2) × ... × 1</p>
                <p><strong>Vazifa:</strong> <code>factorial(n)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'factorial(5)', output: '120' },
            { input: 'factorial(0)', output: '1' },
            { input: 'factorial(3)', output: '6' }
          ],
          testCases: [
            { input: 5, expected: 120 },
            { input: 0, expected: 1 },
            { input: 3, expected: 6 },
            { input: 4, expected: 24 }
          ]
        },
        {
          id: 5,
          title: 'Bubble Sort',
          shortDescription: 'Massivni bubble sort algoritmi bilan saralang.',
          difficulty: 'medium',
          topic: 'sorting',
          tags: ['saralash', 'algoritm'],
          solvedCount: 1532,
          timeLimit: '2s',
          completed: false,
          fullDescription: `<p>Berilgan massivni bubble sort algoritmi yordamida saraladigan funksiya yozing.</p>
                <p><strong>Vazifa:</strong> <code>bubbleSort(arr)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'bubbleSort([64, 34, 25, 12, 22, 11, 90])', output: '[11, 12, 22, 25, 34, 64, 90]' },
            { input: 'bubbleSort([5, 2, 8, 1, 9])', output: '[1, 2, 5, 8, 9]' }
          ],
          testCases: [
            { input: [64, 34, 25, 12, 22, 11, 90], expected: [11, 12, 22, 25, 34, 64, 90] },
            { input: [5, 2, 8, 1, 9], expected: [1, 2, 5, 8, 9] }
          ]
        },
        {
          id: 6,
          title: 'Binary Search',
          shortDescription:'Saralangan massivda binary search algoritmi bilan qidirish.',
          difficulty: 'medium',
          topic: 'arrays',
          tags: ['qidiruv', 'algoritm', 'binary'],
          solvedCount: 987,
          timeLimit: '1s',
          completed: false,
          fullDescription: `<p>Saralangan massivda berilgan elementni binary search algoritmi bilan topadigan funksiya yozing.</p>
                <p><strong>Vazifa:</strong> <code>binarySearch(arr, target)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'binarySearch([1, 2, 3, 4, 5], 3)', output: '2' },
            { input: 'binarySearch([1, 2, 3, 4, 5], 6)', output: '-1' }
          ],
          testCases: [
            { input: { arr: [1, 2, 3, 4, 5], target: 3 }, expected: 2 },
            { input: { arr: [1, 2, 3, 4, 5], target: 6 }, expected: -1 }
          ]
        },
        {
          id: 7,
          title: 'Hanoi Minorasi',
          shortDescription: 'Hanoi minorasi masalasini rekursiv yechim bilan yeching.',
          difficulty: 'hard',
          topic: 'recursion',
          tags: ['rekursiya', 'qiyin', 'algoritm'],
          solvedCount: 234,
          timeLimit: '3s',
          completed: false,
          fullDescription: `<p>Hanoi minorasi masalasini yeching. n ta diskni A ustundan C ustunga ko'chiring.</p>
                <p><strong>Vazifa:</strong> <code>hanoi(n, from, to, aux)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'hanoi(3, "A", "C", "B")', output: 'Harakatlar ro\'yxati' }
          ],
          testCases: [
            { input: { n: 3, from: "A", to: "C", aux: "B" }, expected: 7 }
          ]
        },
        {
          id: 8,
          title: 'Eng Uzun Umumiy Qism',
          shortDescription: 'Ikki satrning eng uzun umumiy qismini toping (LCS).',
          difficulty: 'hard',
          topic: 'strings',
          tags: ['dinamik', 'satr', 'algoritm'],
          solvedCount: 156,
          timeLimit: '2s',
          completed: false,
          fullDescription: `<p>Ikki satrning eng uzun umumiy qismini (LCS) topadigan funksiya yozing.</p>
                <p><strong>Vazifa:</strong> <code>longestCommonSubsequence(s1, s2)</code> funksiyasini yarating.</p>`,
          examples: [
            { input: 'longestCommonSubsequence("ABCDGH", "AEDFHR")', output: '3' },
            { input: 'longestCommonSubsequence("AGGTAB", "GXTXAYB")', output: '4' }
          ],
          testCases: [
            { input: { s1: "ABCDGH", s2: "AEDFHR" }, expected: 3 },
            { input: { s1: "AGGTAB", s2: "GXTXAYB" }, expected: 4 }
          ]
        }
      ]
    };
  },
  mounted() {
    this.filteredProblems = [...this.problems];
  },
  methods: {
    selectProblem(problem) {
      // Bu yerda tanlangan masalani AssignmentComponent ga yuborish
            this.$router.push(`/assignment`);
      this.$emit('problem-selected', {
        lesson: {
          id: problem.id,
          title: problem.title,
          description: problem.fullDescription || problem.shortDescription
        },
        assignment: {
          id: problem.id,
          lessonId: problem.id,
          title: problem.title,
          task: problem.fullDescription || problem.shortDescription,
          examples: problem.examples || [],
          testCases: problem.testCases || [],
          initialCode: problem.initialCode || {
            javascript: `function solution() {\n  // Kodingizni shu yerga yozing\n\n}`,
            python: `def solution():\n  # Kodingizni shu yerga yozing\n  pass`,
            java: `public class Solution {\n  public static void solution() {\n    // Kodingizni shu yerga yozing\n  }\n}`,
            cpp: `#include <iostream>\n\nvoid solution() {\n  // Kodingizni shu yerga yozing\n}`
          }
        }
      });
    },
    
    filterProblems() {
      let filtered = [...this.problems];
      
      // Qiyinlik darajasi bo'yicha filtrlash
      if (this.selectedDifficulty !== 'all') {
        filtered = filtered.filter(p => p.difficulty === this.selectedDifficulty);
      }
      
      // Mavzu bo'yicha filtrlash
      if (this.selectedTopic !== 'all') {
        filtered = filtered.filter(p => p.topic === this.selectedTopic);
      }
      
      // Qidiruv bo'yicha filtrlash
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      this.filteredProblems = filtered;
    },
    
    getDifficultyText(difficulty) {
      const texts = {
        'easy': 'Oson',
        'medium': 'O\'rtacha',
        'hard': 'Qiyin'
      };
      return texts[difficulty] || difficulty;
    },
    
    getTopicText(topic) {
      const texts = {
        'recursion': 'Rekursiya',
        'arrays': 'Massivlar',
        'strings': 'Satrlar',
        'sorting': 'Saralash',
        'math': 'Matematik'
      };
      return texts[topic] || topic;
    }
  }
};
</script>

<style scoped>
.problems-container {
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  min-height: 100vh;
  color: #f1f1f1;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(90deg, rgba(0, 255, 0, 0.1), rgba(0, 255, 255, 0.1));
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 255, 0.2);
}

.header h1 {
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(45deg, #00ffaa, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.2rem;
  color: #cccccc;
  margin: 10px 0 0 0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: rgba(40, 40, 40, 0.8);
  border-radius: 10px;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 14px;
  color: #00ffaa;
  font-weight: 500;
}

.filter-group select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  min-width: 120px;
}

.search-group {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  
}

.search-input::placeholder {
  color: #999;
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.problem-card {
  background: linear-gradient(145deg, #2a2a2a, #1e1e1e);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #444;
  position: relative;
  overflow: hidden;
}

.problem-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00ffaa, #00ccff);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.problem-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border-color: #00ffaa;
}

.problem-card:hover::before {
  opacity: 1;
}

.problem-card.completed {
  border-color: #00cc66;
  background: linear-gradient(145deg, #2a3a2a, #1e2e1e);
}

.difficulty-easy { border-left: 4px solid #00cc66; }
.difficulty-medium { border-left: 4px solid #ffaa00; }
.difficulty-hard { border-left: 4px solid #ff4757; }

.problem-header {
  margin-bottom: 15px;
}

.problem-header h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  color: #ffffff;
}

.problem-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.difficulty-badge, .topic-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-easy { background-color: rgba(0, 204, 102, 0.2); color: #00cc66; }
.badge-medium { background-color: rgba(255, 170, 0, 0.2); color: #ffaa00; }
.badge-hard { background-color: rgba(255, 71, 87, 0.2); color: #ff4757; }

.topic-badge {
  background-color: rgba(0, 204, 255, 0.2);
  color: #00ccff;
}

.problem-description {
  margin-bottom: 15px;
  color: #cccccc;
  line-height: 1.5;
}

.problem-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  color: #999;
  font-size: 12px;
}

.stat-value {
  color: #00ffaa;
  font-weight: 600;
}

.problem-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #444;
}

.problem-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.tag {
  background-color: rgba(100, 100, 100, 0.3);
  color: #ccc;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 11px;
}

.problem-status {
  font-size: 14px;
  font-weight: 600;
}

.status-completed {
  color: #00cc66;
}

.status-pending {
  color: #ffaa00;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.no-results h3 {
  color: #ccc;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .problems-grid {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}
</style>