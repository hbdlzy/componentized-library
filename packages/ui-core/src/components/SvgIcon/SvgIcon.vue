<template>
  <span
    v-if="isExternal"
    class="svg-external-icon svg-icon"
    :class="className"
    :style="externalIconStyle"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel"
    role="img"
  />
  <svg
    v-else
    class="svg-icon"
    :class="className"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel"
    role="img"
  >
    <use
      :href="iconName"
      :xlink:href="iconName"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { SvgIconProps } from './SvgIcon.types'

defineOptions({
  name: 'SvgIcon'
})

const props = withDefaults(defineProps<SvgIconProps>(), {
  className: '',
  prefix: 'icon',
  ariaLabel: ''
})

const normalizedIconClass = computed(() => props.iconClass.trim())
const normalizedPrefix = computed(() => props.prefix.trim() || 'icon')
const isExternal = computed(() => /^(https?:|mailto:|tel:|data:|blob:)/.test(normalizedIconClass.value))
const iconName = computed(() => `#${normalizedPrefix.value}-${normalizedIconClass.value}`)
const ariaHidden = computed(() => props.ariaLabel ? undefined : 'true')

const externalIconStyle = computed<CSSProperties>(() => ({
  mask: `url(${normalizedIconClass.value}) no-repeat 50% 50%`,
  WebkitMask: `url(${normalizedIconClass.value}) no-repeat 50% 50%`
}))
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover !important;
  -webkit-mask-size: cover !important;
}
</style>
