<template>
  <div class="main-tittle">
    <b-row align-v="center">
      <b-col md="3" lg="2">
        <router-link to="/"><img src="~/assets/logo.png" /></router-link>
      </b-col>
      <b-col md="6" lg="8">
        <h1>Test technique</h1>
      </b-col>
      <b-col md="3" lg="2">
        <b-link :to="buttonData.route">{{buttonData.text}}</b-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  computed:{
    buttonData() {
      let currentRoute = this.$route.name;
      if(currentRoute == 'index')
        return {text:"Se connecter",route:"/connexion"}
      else if(currentRoute == 'connexion')
        return {text:"S'inscrire",route:"/"}
      else
        return {text:"Se déconnecter",route:"/connexion"}
    },
  }
};
</script>

<style>
.main-tittle {
  text-align: center;
  margin-bottom: 3%;
}
.main-tittle h1 {
  font-weight: bold;
}
</style>