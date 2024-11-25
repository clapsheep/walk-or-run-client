<script setup lang="ts">
import { ref, watch } from "vue";
import BasicInput from "@/components/atoms/BasicInput.vue";
import BasicSelect from "@/components/molecules/BasicSelect.vue";
import BasicButton from "@/components/atoms/BasicButton.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

interface Props {
  options: Record<string, string>;
  placeholder?: string;
  initialKeyword?: string;
  buttonText?: string;
  selectLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "검색어를 입력하세요",
  initialKeyword: "",
  buttonText: "검색",
  selectLabel: "검색"
});

// 초기 키워드 설정
const defaultKeyword = props.initialKeyword || Object.keys(props.options)[0] || "";

const emit = defineEmits<{
  (e: 'search', value: { keyword: string; input: string }): void;
  (e: 'update:keyword', value: string): void;
  (e: 'update:input', value: string): void;
}>();

const keyword = ref(defaultKeyword);
const input = ref("");

const handleSearch = () => {
  emit('search', { keyword: keyword.value, input: input.value });
};

watch(keyword, (newValue) => {
  emit('update:keyword', newValue);
});

watch(input, (newValue) => {
  emit('update:input', newValue);
});
</script>

<template>
  <div class="w-full">
    <div class="flex gap-4">
      <div class="w-1/4 flex items-start">
        <BasicSelect
          id="search-type"
          :label="props.selectLabel"
          name="keyword"
          :options="props.options"
          v-model="keyword"
          size="md"
          direction="row"
          class="w-full"
        />
      </div>
      <div class="flex-1 flex items-start">
        <BasicInput
          id="search-input"
          name="search"
          v-model="input"
          type="search"
          :placeholder="props.placeholder"
          size="md"
          class="w-full"
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="flex items-start">
        <BasicButton
          type="button"
          variant="filled"
          size="md"
          @click="handleSearch"
        >
          <template #icon>
            <MagnifyingGlassIcon class="w-8 h-8 stroke-[1.5] items-center" />
          </template>
          {{ props.buttonText }}
        </BasicButton>
      </div>
    </div>
  </div>
</template>
