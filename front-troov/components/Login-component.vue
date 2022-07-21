<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Adresse email:"
        label-for="input-1"
        description="Nous ne communiquerons jamais votre adresse email à qui que ce soit.."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Entrer votre email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Votre mot de passe:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Se connecter</b-button>
    </b-form>

    <div class="loginpage-inscription">
      Vous n'avez pas encore de compte ?
      <router-link to="/">Inscrivez-vous</router-link> !
    </div>
  </div>
</template>

<script>
import utils from './utils'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      fetch('http://localhost:3001/user/getOne/' + this.form.email)
        .then(async (response) => {
          const json = await response.json()
          if (!json) {
            utils.createAlert(
              'Identifiants incorrect !',
              "Il n'y a pas de compte enregistré pour cette adresse e-mail.",
              'error',
              'Fermer'
            )
            return
          }
          if (json.password === utils.hashPassword(this.form.password)) {
            this.$router.push({
              name: 'personne',
              params: { email: this.form.email }
            })
          } else {
            utils.createAlert(
              'Mot de passe incorrect !',
              '',
              'error',
              'Fermer'
            )
          }
        })
        .catch(function (error) {
          utils.createAlert('Erreur !', error, 'error', 'Fermer')
        })
    }
  }
}
</script>

<style scoped>
.loginpage-inscription {
  margin-top: 1%;
}
</style>
