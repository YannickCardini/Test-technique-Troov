<template>
  <section>
    <div class="h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mx-1 mx-md-4 mt-4 register">
                    S'inscrire
                  </p>

                  <form class="mx-1 mx-md-4" @submit="onSubmit">
                    <div class="d-flex flex-row align-items-center">
                      <b-form-group
                        id="input-group-email-register"
                        label="Adresse email:"
                        label-for="input-email-register"
                      >
                        <b-form-input
                          id="input-email-register"
                          type="email"
                          placeholder="Entrer votre email"
                          v-model="form.email"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </div>

                    <div class="d-flex flex-row align-items-center">
                      <b-form-group
                        id="input-group-password-register"
                        label="Mot de passe:"
                        label-for="input-password-register"
                        description="Votre mot de passe doit comporter au moins 8 caractères.."
                      >
                        <b-form-input
                          id="input-password-register"
                          type="password"
                          placeholder="Entrer votre mot de passe"
                          v-model="form.password"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </div>

                    <div class="d-flex flex-row align-items-center">
                      <b-form-group
                        id="input-group-password-repeat-register"
                        label="Répéter mot de passe:"
                        label-for="input-password-repeat-register"
                      >
                        <b-form-input
                          id="input-password-repeat-register"
                          type="password"
                          placeholder="Entrer votre mot de passe"
                          v-model="form.repeat"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <b-button type="submit" variant="primary"
                        >S'inscrire</b-button
                      >
                    </div>
                  </form>
                </div>
                <div
                  class="
                    col-md-10 col-lg-6 col-xl-7
                    d-flex
                    align-items-center
                    order-1 order-lg-2
                  "
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="link-connexion">
          Vous avez déjà un compte ?
          <router-link to="/connexion">&nbsp;Connectez-vous</router-link>&nbsp;!
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const utils = require('./utils.js')

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        repeat: ''
      }
    }
  },
  methods: {
    sendNewUser (form) {
      const encryptedPassword = utils.hashPassword(form.password)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: encryptedPassword
        })
      }
      fetch('http://localhost:3001/user/post', requestOptions).then(
        async (response) => {
          const reponseJson = await response.json()
          if (response.status === 201) {
            utils
              .createAlert(
                'Compte créé avec succès!',
                reponseJson.message,
                'success',
                'Se connecter'
              )
              .then((result) => {
                if (result.isConfirmed) this.$router.push({ path: '/connexion' })
              })
          } else {
            utils.createAlert(
              'Erreur !',
              reponseJson.message,
              'error',
              'Fermer'
            )
          }
        }
      )
    },
    onSubmit (event) {
      event.preventDefault()
      if (utils.isPasswordOk(this.form)) this.sendNewUser(this.form)
      else {
        utils.createAlert(
          'Mot de passe incorrect !',
          'Les deux champs de mot de passe doivent être identiques et doivent comporter au moins 8 caractères.',
          'error',
          'Fermer'
        )
      }
    }
  }
}
</script>

<style>
.form-group {
  width: 100%;
}
.register {
  margin-bottom: 0.7em;
}
.mx-4 {
  margin-top: 0.5em;
}
.link-connexion{
  display: contents;
}
</style>
