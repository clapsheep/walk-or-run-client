<script setup lang="ts">
import BasicButton from '../atoms/BasicButton.vue'

defineProps<{
  isFollowing: boolean
}>()

defineEmits<{
  (e: 'toggleFollow'): void
}>()
</script>

<template>
  <BasicButton
    :variant="isFollowing ? 'filled' : 'outlined'"
    :color="isFollowing ? 'warning' : 'primary'"
    size="sm"
    @click="$emit('toggleFollow')"
    class="min-w-[80px] transition-all duration-200"
  >
    {{ isFollowing ? '팔로잉' : '팔로우' }}
  </BasicButton>
</template>
