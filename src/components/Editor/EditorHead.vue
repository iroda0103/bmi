<template>
  <div class="heading-block">
    <div class="editable-heading" 
    contenteditable="true" 
    @input="updateContent" 
    ref="editableHeading"></div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: 'Sarlavha'
    }
  },
  methods: {
    updateContent(e) {
      this.$emit('update:content', e.target.innerHTML);
    }
  },
  mounted() {
    this.$refs.editableHeading.innerHTML = this.content;
  },
};
</script>

<style>
.heading-block {
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.heading-block:hover {
  border-color: #eee;
}

.editable-heading {
  font-size: 1.8em;
  font-weight: bold;
  min-height: 30px;
  outline: none;
}
</style>