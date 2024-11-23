<script setup lang="ts">
import NavigationBar from '@/components/organisms/NavigationBar.vue'
import BasicModal from '@/components/molecules/BasicModal.vue'
</script>

<template>
  <div class="min-h-screen bg-white p-4">
    <div class="flex h-[calc(100vh-32px)] gap-4">
      <NavigationBar />
      <main class="flex-1 overflow-y-auto rounded-[20px]">
        <RouterView />
      </main>
    </div>
  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}

/* 스크롤바 스타일링 (선택적) */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
