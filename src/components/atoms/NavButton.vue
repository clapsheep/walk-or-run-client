<script setup>
const {
  to,
  icon,
  name,
  isCollapsed = false,
} = defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: Function,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <RouterLink
    :to="to"
    :class="{ 'justify-center': isCollapsed }"
    activeClass="bg-brand-yellow hover:bg-brand-yellowDark text-black font-semibold"
    class="hover:bg-brand-dark flex items-center rounded-lg p-2 font-light text-white"
  >
    <component :is="icon" class="h-6 w-6" />
    <span v-if="!isCollapsed" class="ml-3">{{ name }}</span>
  </RouterLink>
</template>
