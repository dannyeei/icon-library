<script setup lang="ts">
import Logo from './Logo.vue'
// const buildTime = __BUILD_TIME__

// const timeAgo = useTimeAgo(new Date(buildTime))
</script>

<template>
  <footer class="pt-8 pb-6 text-12px">
    <div class="flex flex-row justify-center align-middle items-center text-12px font-500 opacity-50">
      <div class="whitespace-nowrap">
        Built in partnership with
      </div>
      <div class="ml2">
        <Logo style="height: 17px" />
      </div>
    </div>

    <!-- <p class="color-fade">
      built by
      <a
        class="opacity-75 hover:opacity-100"
        href="https://github.com/antfu"
        target="_blank"
      >@antfu</a>,
      powered by
      <a
        class="opacity-75 hover:opacity-100"
        href="https://iconify.design"
        target="_blank"
      >Iconify</a>
    </p>
    <div color-fade mt-1 op50 italic>
      Last update: {{ buildTime }} ({{ timeAgo }})
    </div> -->
  </footer>
</template>
