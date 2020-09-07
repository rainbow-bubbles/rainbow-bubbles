import isRainbowBubbles from './packages/rainbow-bubbles.vue';

const components = [isRainbowBubbles];

const install = vue => {
  components.map(component => {
    vue.component(component.name, component)
  })
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default isRainbowBubbles;