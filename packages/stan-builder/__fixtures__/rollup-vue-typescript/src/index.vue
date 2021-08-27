<template>
  <div @click="handleNameClick">hello {{ name }}}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import services from './services';

@Component({ name: 'rollup-vue' })
export default class RollupVue extends Vue {
  name = 'bob';

  handleNameClick() {
    services.hello(this.name);
  }
}
</script>
