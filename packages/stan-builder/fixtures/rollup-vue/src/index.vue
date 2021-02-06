<template>
  <div>
    hello {{name}}}
  </div>
</template>

<script>
const RollupVue = {
  name: 'rollup-vue',
  data() {
    return {
      name: 'bob'
    };
  },
}

RollupVue.install = function(Vue) {
  Vue.component(RollupVue.name, RollupVue);
};

export default RollupVue;
</script>
