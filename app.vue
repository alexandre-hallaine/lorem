<script setup lang="ts">
import { loremIpsum } from "lorem-ipsum";
import type { LoremUnit } from "lorem-ipsum/types/src/constants/units";

const amount = useCookie("amount", { default: () => 5 });
const unit = useCookie("unit", { default: () => "Paragraph" });
const lorem = useState("lorem", generate);
const units = ["Word", "Sentence", "Paragraph"];

const { copy } = useClipboard({ source: lorem });
const toast = useToast();

function generate() {
  return loremIpsum({
    count: amount.value,
    units: unit.value.toLowerCase() as LoremUnit,
  });
}

function copyClick() {
  copy();
  toast.add({ title: "Copied" });
}

watchDebounced([amount, unit], () => (lorem.value = generate()), {
  debounce: 200,
});
</script>

<template>
  <UApp>
    <UPageSection title="Lorem Minimal" :ui="{ container: 'h-screen lg:flex' }">
      <UCard
        class="h-full flex flex-col overflow-hidden shadow-lg"
        :ui="{ body: 'overflow-auto' }"
      >
        <template #header>
          <div class="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto">
            <UInputNumber v-model="amount" :min="0" />
            <USelect v-model="unit" :items="units" />
            <UButton
              label="Copy"
              :ui="{ label: 'text-center w-full' }"
              @click="copyClick"
            />
          </div>
        </template>
        <p class="whitespace-pre-wrap">{{ lorem }}</p>
      </UCard>
    </UPageSection>
  </UApp>
</template>
