<script setup lang="ts">
import {loremIpsum} from 'lorem-ipsum'

const amount = useCookie('amount', { default: () => 5 });
const unit = useCookie('unit', { default: () => 'Paragraph' });
const lorem = useState('lorem', generate)
const units = ['Word', 'Sentence', 'Paragraph']

const {copy} = useClipboard({source: lorem})
const toast = useToast()

function generate() {
  return loremIpsum({
    count: amount.value,
    units: unit.value.toLowerCase()
  })
}

function copyClick() {
  copy()
  toast.add({title: "Copied"})
}

watchDebounced(
  [amount, unit],
  () => lorem.value = generate(),
  { debounce: 500, maxWait: 1000 },
)
</script>

<template>
  <UApp>
    <UPageSection>
      <UPageCTA title="Lorem Minimal">
        <div class="flex justify-center gap-3">
          <UInputNumber v-model="amount" :min="0"/>
          <USelectMenu v-model="unit" :items="units"/>
          <UButton label="Copy" @click="copyClick"/>
        </div>
        <p class="whitespace-pre-wrap h-100 overflow-auto">{{ lorem }}</p>
      </UPageCTA>
    </UPageSection>
  </UApp>
</template>
