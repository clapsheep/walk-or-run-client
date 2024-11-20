<script setup>
import NavigationBar from '@/components/molecules/NavigationBar.vue'
</script>

<template>
  <div class="bg-brand-dark min-h-screen p-4">
    <div class="flex h-[calc(100vh-32px)] gap-4">
      <NavigationBar />
      <main class="flex-1">
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
</style>
