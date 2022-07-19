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
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Se connecter</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>

    <div>
      Vous n'avez pas encore de compte ?
      <router-link to="/inscription">Inscrivez-vous</router-link> !
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      fetch("http://localhost:3001/api/getOne/" + this.form.email)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          console.log(json);
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
};
</script>
