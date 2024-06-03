<template>
    <div>
        <div style="display:flex; justify-content:space-between;">
            <span> {{ props.label }} </span> <button @click="addItem"> +</button>
        </div>
        <div v-for="item, idx in list" :key="idx" draggable="true" @dragstart="dragStart(idx)" @dragover.prevent
            @drop="drop(idx)">
            <span> {{ idx + 1 }}. {{ item }} </span> <button @click="removeItem(idx)"> - </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    value: {
        type: Array,
        default: []
    },
    addAction: {
        type: Function,
        default: () => { }
    }
})
const list = ref(props.value);
const draggedIndex = ref(null);
const emits = defineEmits(['change'])
defineExpose({
    getValue,
    setValue,
    list,
})
function dragStart(index) {
    draggedIndex.value = index;
  }
  
  function drop(targetIndex) {
    const item = list.value.splice(draggedIndex.value, 1)[0];
    list.value.splice(targetIndex, 0, item);
    emits('change', list.value);
    draggedIndex.value = null; // Reset dragged index
  }

function getValue() {
    return list.value
}
function setValue(newValue) {
    list.value = newValue
}

function addItem(item) {
  if(props.addAction){
    props.addAction()
  }
    // emits('change', list.value)
}
function removeItem(idx) {
    list.value = list.value.splice(0, idx, list.value.splice(idx + 1))
    // emits('change', list.value)
}
</script>

<style lang="scss" scoped></style>

<!-- 
<template>
    <ol>
      <li v-for="(item, idx) in internalItems" :key="idx"
          draggable="true"
          @dragstart="dragStart(idx)"
          @dragover.prevent
          @drop="drop(idx)">
        {{ idx + 1 }}. {{ item }}
      </li>
    </ol>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Props definition
  const props = defineProps({
    items: Array,
    label: String,
  });
  
  const internalItems = ref([...props.items]);
  let draggedIndex = ref(null);
  
  function dragStart(index) {
    draggedIndex.value = index;
  }
  
  function drop(targetIndex) {
    const item = internalItems.value.splice(draggedIndex.value, 1)[0];
    internalItems.value.splice(targetIndex, 0, item);
    emit('change', internalItems.value);
    draggedIndex.value = null; // Reset dragged index
  }
  
  const emit = defineEmits(['change']);
  </script>
  
  <style scoped>
  li {
    padding: 8px;
    margin: 5px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: grab;
  }
  ol {
    counter-reset: list;
  }
  li::before {
    content: counter(list) ". ";
    counter-increment: list;
  }
  </style>
   -->