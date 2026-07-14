import type { App } from 'vue'

const HBDL_RIPPLE_KEY = '__HBDL_UI_RIPPLE__'
const RIPPLE_STYLE_ID = 'hbdl-ui-ripple-style'
const RIPPLE_HOST_CLASS = 'hbdl-ripple-host'
const RIPPLE_WAVE_CLASS = 'hbdl-ripple__wave'

const RIPPLE_TARGET_SELECTOR = [
  'button',
  '[role="button"]',
  '.el-button',
  '.el-radio-button__inner',
  '.el-checkbox-button__inner'
].join(',')

const RIPPLE_DISABLED_SELECTOR = [
  ':disabled',
  '[disabled]',
  '[aria-disabled="true"]',
  '.is-disabled',
  '.is-loading'
].join(',')

const RIPPLE_SKIP_SELECTOR = '[data-hbdl-ripple="false"]'

const RIPPLE_STYLE = `
.${RIPPLE_HOST_CLASS} {
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

.${RIPPLE_HOST_CLASS} > .${RIPPLE_WAVE_CLASS} {
  position: absolute;
  left: var(--hbdl-ripple-x);
  top: var(--hbdl-ripple-y);
  width: var(--hbdl-ripple-size);
  height: var(--hbdl-ripple-size);
  border-radius: 999px;
  background: var(--hbdl-ripple-color, currentColor);
  pointer-events: none;
  opacity: 0;
  transform: scale(0);
  animation: hbdl-ripple-wave 560ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes hbdl-ripple-wave {
  0% {
    opacity: 0.22;
    transform: scale(0);
  }

  55% {
    opacity: 0.18;
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .${RIPPLE_HOST_CLASS} > .${RIPPLE_WAVE_CLASS} {
    animation-duration: 1ms;
  }
}
`

interface RippleState {
  teardown: () => void
}

type RippleWindow = Window & {
  [HBDL_RIPPLE_KEY]?: RippleState
}

const noop = () => undefined

export type RippleTeardown = () => void

export interface RipplePlugin {
  install: (app?: App) => RippleTeardown
}

export function installRipple(_app?: App): RippleTeardown {
  if (!canUseDOM()) {
    return noop
  }

  const rippleWindow = window as RippleWindow

  if (rippleWindow[HBDL_RIPPLE_KEY]) {
    return rippleWindow[HBDL_RIPPLE_KEY].teardown
  }

  injectRippleStyle()

  document.addEventListener('pointerdown', handlePointerDown, true)
  document.addEventListener('keydown', handleKeyDown, true)

  const teardown = () => {
    document.removeEventListener('pointerdown', handlePointerDown, true)
    document.removeEventListener('keydown', handleKeyDown, true)
    delete rippleWindow[HBDL_RIPPLE_KEY]
  }

  rippleWindow[HBDL_RIPPLE_KEY] = {
    teardown
  }

  return teardown
}

export function uninstallRipple() {
  if (!canUseDOM()) {
    return
  }

  const rippleWindow = window as RippleWindow
  rippleWindow[HBDL_RIPPLE_KEY]?.teardown()
}

export const Ripple: RipplePlugin = {
  install: installRipple
}

export default Ripple

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function injectRippleStyle() {
  if (document.getElementById(RIPPLE_STYLE_ID)) {
    return
  }

  const style = document.createElement('style')
  style.id = RIPPLE_STYLE_ID
  style.textContent = RIPPLE_STYLE
  document.head.appendChild(style)
}

function handlePointerDown(event: PointerEvent) {
  if (event.defaultPrevented || event.button !== 0) {
    return
  }

  const target = findRippleTarget(event.target)

  if (!target) {
    return
  }

  createRipple(target, event.clientX, event.clientY)
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.defaultPrevented || event.repeat || !isActivationKey(event.key)) {
    return
  }

  const target = findRippleTarget(event.target)

  if (!target) {
    return
  }

  const rect = target.getBoundingClientRect()
  createRipple(target, rect.left + rect.width / 2, rect.top + rect.height / 2)
}

function findRippleTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null
  }

  const rippleTarget = target.closest(RIPPLE_TARGET_SELECTOR)

  if (!(rippleTarget instanceof HTMLElement)) {
    return null
  }

  if (rippleTarget.closest(RIPPLE_SKIP_SELECTOR) || rippleTarget.closest(RIPPLE_DISABLED_SELECTOR)) {
    return null
  }

  return rippleTarget
}

function createRipple(target: HTMLElement, clientX: number, clientY: number) {
  const rect = target.getBoundingClientRect()

  if (rect.width <= 0 || rect.height <= 0) {
    return
  }

  const offsetX = clientX - rect.left
  const offsetY = clientY - rect.top
  const maxX = Math.max(offsetX, rect.width - offsetX)
  const maxY = Math.max(offsetY, rect.height - offsetY)
  const size = Math.ceil(Math.sqrt(maxX * maxX + maxY * maxY) * 2)
  const ripple = document.createElement('span')

  prepareRippleHost(target)
  ripple.className = RIPPLE_WAVE_CLASS
  ripple.setAttribute('aria-hidden', 'true')
  ripple.style.setProperty('--hbdl-ripple-size', `${size}px`)
  ripple.style.setProperty('--hbdl-ripple-x', `${offsetX - size / 2}px`)
  ripple.style.setProperty('--hbdl-ripple-y', `${offsetY - size / 2}px`)

  target.insertBefore(ripple, target.firstChild)
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
  window.setTimeout(() => ripple.remove(), 700)
}

function prepareRippleHost(target: HTMLElement) {
  target.classList.add(RIPPLE_HOST_CLASS)

  if (getComputedStyle(target).position === 'static') {
    target.style.position = 'relative'
  }
}

function isActivationKey(key: string) {
  return key === 'Enter' || key === ' ' || key === 'Spacebar'
}
