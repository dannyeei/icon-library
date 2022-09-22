<script setup lang="ts">
import Logo from './Logo.vue'
// const buildTime = __BUILD_TIME__

// const timeAgo = useTimeAgo(new Date(buildTime))
</script>

<template>
  <footer class="pt-8 pb-6 text-12px">
    <div class="flex flex-row justify-center align-middle items-center text-12px font-500 opacity-50">
      <div class="whitespace-nowrap">
        Built by <a class="underline" href="https://www.relume.io/" target="_blank">Relume</a> in partnership with
      </div>
      <a href="https://www.flowgurus.co/" target="_blank">
        <div class="ml2">
          <Logo style="height: 17px" />
        </div>
      </a>
    </div>

<div class="ri-footer-cta_component"><img src="https://assets.website-files.com/6177739448baa66404ce1d9c/6317d6bd254e26b3250e9d9b_rl-symbol.svg" loading="lazy" alt="" class="ri-footer-cta_rl-symbol"><div class="ri-footer-cta_text-wrapper"><div class="ri-footer-cta_text-medium">Join 10,000+ Developers using Relume Library to build faster in Webflow</div><div class="ri-footer-cta_text-small">Access the world’s largest library of Webflow components</div></div><a href="https://library.relume.io/" target="_blank" class="r-footer-cta_button w-button">Try for free</a></div>

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
