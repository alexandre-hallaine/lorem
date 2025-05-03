<script setup lang="ts">
import { loremIpsum } from "lorem-ipsum";

const data = ref('')
const { copy } = useClipboard({ source: data })

const amount = ref(5)
const unit = ref('Paragraphs')
const units = ['Word', 'Sentence', 'Paragraph']


function generate() {
  data.value = loremIpsum({
    count: amount.value,
    units: unit.value.toLowerCase()
  }).replace(/\n/g, '\n\n')
}

const toast = useToast()

function toastCopy() {
  copy()
  toast.add({title: "Copied"})
}
</script>

<template>
  <UPageSection>
    <UPageCTA title="Lorem">
      <div class="flex justify-center gap-3">
        <UInputNumber v-model="amount" :min="0"/>
        <UInputMenu v-model="unit" :items="units"/>
        <UButton @click="generate">Generate</UButton>
        <UButton label="Copy" color="neutral" @click="toastCopy"/>
      </div>
      <p class="whitespace-pre-wrap">{{data}}</p>
    </UPageCTA>
  </UPageSection>
</template>
