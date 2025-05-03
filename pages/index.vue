<script setup lang="ts">
import { LoremIpsum } from "lorem-ipsum";

const data = ref('')
const { copy } = useClipboard({ source: data })

const lorem = new LoremIpsum();

const amount = ref(5)
const type = ref('Paragraphs')
const types = ['Words', 'Sentences', 'Paragraphs']


function generate() {
  switch (type.value) {
    case 'Words':
      data.value = lorem.generateWords(amount.value);
      break;
    case 'Sentences':
      data.value = lorem.generateSentences(amount.value);
      break;
    case 'Paragraphs':
      data.value = lorem.generateParagraphs(amount.value);
      break;
  }
}
</script>

<template>
  <div>
    <UInputNumber v-model="amount" :min="0"/>
    <UInputMenu v-model="type" :items="types"/>
    <UButton @click="generate">Generate</UButton>
    <UButton @click="copy()">Copy</UButton>
    <p>{{data}}</p>
  </div>
</template>
