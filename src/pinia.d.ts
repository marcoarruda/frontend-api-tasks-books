import 'pinia'
import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $pinia: import('pinia').Pinia
  }
}