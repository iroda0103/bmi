<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>


<template>

{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<!-- v-if/v-else -->
<p v-if="isLoggedIn">Xush kelibsiz!</p>
<p v-else>Iltimos login qiling</p>

<!-- v-for -->
<ul>
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</ul>

<!-- v-on -->
 <!-- To'liq sintaksis -->
<button v-on:click="count++">Bosing</button>
<!-- Qisqartirilgan sintaksis -->
<button @click="count++">Bosing</button>
<!-- Method chaqirish: -->
<button @click="increment">Bosing</button>
<!-- Method chaqirish argumentlar bilan -->
<button @click="increment(5)">Bosing</button>


<div :id="`list-${id}`"></div>

    <button @click="increment">Count is: {{ count }}</button>

    <span>Message: {{ msg }}</span>

    <div v-bind:class="{ active: isActive }"></div>
    <!-- Qisqartmasi: :class="{ active: isActive }" -->
    <!--  -->
    <div :id></div>
    <div v-bind:id></div>

</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<style scoped>
button {
  font-weight: bold;
}
</style>
<!-- v-model -->
<template>
  <input v-model="username" placeholder="Ismingizni kiriting" />
  <p>Salom, {{ username }}!</p>
</template>

<script>
  export default {
    data() {
      return {
        username: ''
      }
    }
  }
  </script>

<button @click="sayHi('Ali')">Salom Ali</button>

<script>
export default {
  methods: {
    sayHi(name) {
      alert('Salom ' + name)
    }
  }
}
</script>

<input @input="handleInput($event)" />

<script>
export default {
  methods: {
    handleInput(event) {
      console.log('Qiymat:', event.target.value)
    }
  }
}
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <button @click="count++">Sanoq: {{ count }}</button>
  </div>
</template>

<script>

// Ma'lumot saqlash
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
// Ma'lumotni o'qish 
const token = localStorage.getItem('token'); 
// Ma'lumotni o'chirish 
localStorage.removeItem('token'); 
// Barcha ma'lumotlarni o'chirish 
localStorage.clear();

HttpOnly cookie JWT t
export default {
  data() {
    return {
      count: 0,
      message: 'Salom, Vue!'
    }
  }
}

import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      message: 'Salom',
      isLoading: false
    })
    
    return { count, ...state }
  }
}
</script>




<!-- Ota.vue -->
<ChildComponent userName="Iroda" />

<!-- BolaComponent.vue -->
<template>
  <p>Salom, {{ userName }}!</p>
</template>

<script>
export default {
  props: ['userName']
}
</script>




<p>To'liq ism: {{ fullName }}</p>
<script>
export default {
  data() {
    return {
      firstName: 'Alisher',
      lastName: 'Navoiy'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}
</script>

<button @click="increment">{{ count }}</button>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchResults: []
    };
  },
  watch: {
    searchQuery(newQuery) {
      // Soʻrov oʻzgarganda API-ga murojaat qilish
      this.fetchResults(newQuery);
    }
  },
  methods: {
    async fetchResults(query) {
      // API soʻrov...
    }
  }
};
</script>
