<script setup lang='ts'>
import copyText from 'copy-text-to-clipboard'
import { getIconSnippet, toComponentName } from '../utils/icons'
import { copyPreviewColor, previewColor, relumeSize, showCaseSelect, showHelp, wfClassName } from '../store'
import { Download } from '../utils/pack'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  showCollection: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close', 'copy'])

const caseSelector = ref<HTMLDivElement>()
const color = computed(() => copyPreviewColor.value ? previewColor.value : 'currentColor')

onClickOutside(caseSelector, () => {
  showCaseSelect.value = false
})

const copy = async(type: string) => {
  const text = await getIconSnippet(props.icon, type, true, color.value)
  if (!text)
    return

  emit('copy', copyText(text))
}

const copyDataToClipboard = (text: string, type = 'text/plain') => {
  const copyOverride = (e: ClipboardEvent) => {
    if (e.clipboardData == null)
      return false
    e.clipboardData.setData(type, text)
    e.preventDefault()
    document.removeEventListener('copy', copyOverride)
  }
  try {
    document.addEventListener('copy', copyOverride)
    emit('copy', true)
    return copyText(text)
  }
  catch (ex) {
    return false
  }
}

const copyJson = async(type: string, className?: string) => {
  const text = await getIconSnippet(props.icon, type, true, color.value, className)
  if (!text)
    return

  copyDataToClipboard(text, 'application/json')
}

const download = async(type: string) => {
  const text = await getIconSnippet(props.icon, type, false, color.value)
  if (!text)
    return
  const name = `${toComponentName(props.icon)}.${type}`
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })

  Download(blob, name)
}

const iconVariants = [
  { className: 'icon-embed-xxsmall', text: 'Icon XXSmall (16px)', size: '1rem' },
  { className: 'icon-embed-xsmall', text: 'Icon XSmall (24px)', size: '1.5rem' },
  { className: 'icon-embed-small', text: 'Icon Small (32px)', size: '2rem' },
  { className: 'icon-embed-medium', text: 'Icon Medium (48px)', size: '3rem' },
  { className: 'icon-embed-large', text: 'Icon Large (80px)', size: '5rem' },
  { className: 'icon-embed-xlarge', text: 'Icon XLarge (104px)', size: '6.5rem' },
]
</script>

<template>
  <div class="px-20px py-40px  flex flex-col flex-wrap md:flex-row md:text-left relative">
    <IconButton class="absolute top-0 right-0 p-3 text-2xl flex-none leading-none" icon="carbon:close" @click="$emit('close')" />
    <div class="h-120px rounded-8px bg-grey" :style="{color: previewColor}">
      <Icon class="text-64px p-28px" :icon="icon" />
    </div>
    <div class="px-20px mb-2">
      <div class="text-18px font-500">
        {{ icon }}
      </div>
      <!-- <button
        class="text-gray-500 hover:text-primary text-sm dark:text-dark-500 !outline-none"
        @click="showHelp = !showHelp"
      >
        For best practices on using icons in Webflow <strong>click here</strong>
      </button> -->

      <div class="flex flex-wrap mt-2">
        <div class="text-16px mr-4 pt-1">
          Size:
        </div>
        <button
          v-for="item in iconVariants"
          :key="item.className"
          class="btn small mr-2 mb-1"
          :class="relumeSize === item.size ? '' : 'border-opacity-15 opacity-50'"
          @click="relumeSize = item.size"
          @sclick="copyJson('webflow-svg', item.className)"
        >
          {{ item.text }}
        </button>
      </div>

      <div class="flex flex-wrap mt-2">
        <div class="mr-4">
          <!-- <div class="my-1 text-gray-500 text-sm">Copy to clipboard</div> -->
          <button class="btn h-36px bg-pseudoblack text-white mr-2 mb-1 px-24px" @click="copyJson('webflow-svg')">
            Copy
          </button>
          <button class="btn border-pseudoblack text-pseudoblack h-36px mr-2 mb-1" @click="download('relume-svg')">
            Download as SVG
          </button>
          <!-- <button class="btn small mr-1 mb-1 opacity-75" @click="copy('svg')">SVG</button> -->
        </div>
        <!-- <div class="mr-4">
          <div class="my-1 text-gray-500 text-sm">Download</div>
        </div> -->
        <!-- <div class="mr-4">
          <div class="my-1 text-gray-500 text-sm">
            Classname for Webflow Icon
          </div>
          <input
            v-model="wfClassName"
            aria-label="Classname for Webflow Icon"
            class="shadow rounded outline-none py-1 px-4 border border-transparent dark:border-dark-200 text-gray-400 text-sm w-full text-"
          >
        </div> -->
      </div>
    </div>
  </div>
</template>
