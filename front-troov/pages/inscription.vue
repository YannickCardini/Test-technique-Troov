<template>
  <div style="padding:5%">
    <tittle />
    <register />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tittle from "~/components/Tittle.vue";


export default Vue.extend({
  components: { Tittle },
  name: "IndexPage",
});
</script>
