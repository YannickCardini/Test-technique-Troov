<template>
  <div>
    <tittle v-if="show" />
    <tableau v-if="show" />
    <redirection-register v-if="!show" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tittle from "~/components/Tittle.vue";
const utils = require("~/components/utils.js");

export default Vue.extend({
  components: { Tittle },
  name: "gestionObjet",
  data() {
    return {
      show: true,
    };
  },
  created() {
    console.log("Params: ", this.$route.params);
    if (utils.jsonIsEmpty(this.$route.params)) this.show = false;
  },
});
</script>
