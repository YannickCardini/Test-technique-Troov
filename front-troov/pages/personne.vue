<template>
  <div>
    <tittle-component v-if="show" />
    <table-component v-if="show" />
    <redirection-register v-if="!show" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const utils = require('~/components/utils.js')

export default Vue.extend({
  name: 'PersonnePage',
  data () {
    return {
      show: true
    }
  },
  created () {
    if (utils.jsonIsEmpty(this.$route.params)) this.show = false
  }
})
</script>
