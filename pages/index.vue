<script setup lang="ts">
import { loremIpsum } from "lorem-ipsum";
import { useStorage } from '@vueuse/core'

const data = ref('')
const amount = useStorage('amount', 5);
const unit = useStorage('unit', 'Paragraph');
const units = ['Word', 'Sentence', 'Paragraph']

const { copy } = useClipboard({ source: data })
const toast = useToast()

function generate() {
  data.value = loremIpsum({
    count: amount.value,
    units: unit.value.toLowerCase()
  }).replace(/\n/g, '\n\n')
}

function toastCopy() {
  copy()
  toast.add({title: "Copied"})
}

onMounted(() => generate())
watch([amount, unit], () => generate())
</script>

<template>
  <UPageSection>
    <UPageCTA title="Lorem">
      <div class="flex justify-center gap-3">
        <UInputNumber v-model="amount" :min="0"/>
        <UInputMenu v-model="unit" :items="units"/>
        <UButton label="Copy" @click="toastCopy"/>
      </div>
      <p class="whitespace-pre-wrap h-100 overflow-auto">{{data}}</p>
    </UPageCTA>
  </UPageSection>
</template>
