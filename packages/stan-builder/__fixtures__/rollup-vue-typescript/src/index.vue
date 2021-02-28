<template>
  <div>
    hello {{name}}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'rollup-vue' })
export default class RollupVue  extends Vue {
  name = 'bob'
}
</script>
