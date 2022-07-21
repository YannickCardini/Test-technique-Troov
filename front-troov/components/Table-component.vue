<template>
  <b-container fluid>
    <b-row class="first-row-text"> <h4>Ajouter une personne:</h4></b-row>
    <b-row>
      <b-col lg="6">
        <b-form-input v-model="nom" placeholder="Entrer un nom"></b-form-input>
        <p>Nommez la personne</p>
      </b-col>
      <b-col lg="2">
        <div>
          <b-form-spinbutton
            v-model="age"
            min="1"
            max="100"
          ></b-form-spinbutton>
          <p>Sélectionnez un âge</p>
        </div>
      </b-col>
      <b-col lg="2">
        <b-form-select
          v-model="isActive"
          :options="activeOptions"
        ></b-form-select>
        <p>La personne est-elle active ?</p>
      </b-col>
      <b-col>
        <b-button
          variant="success"
          :disabled="addIsDisabled"
          @click="addPerson()"
          >Ajouter</b-button
        >
      </b-col>
    </b-row>

    <b-row class="first-row-text"> <h4>Liste des personnes:</h4></b-row>

    <!-- Main table element -->
    <b-table
      v-if="items.length > 0"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :busy="isBusy"
      v-model:sort-by="sortBy"
      v-model:sort-desc="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      small
    >
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Modifier
        </b-button>
        <b-button size="sm" @click="deletePerson(row.item)" variant="danger">
          Supprimer
        </b-button>
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Chargement...</strong>
        </div>
      </template>
    </b-table>

    <p v-if="items.length == 0" class="no-items">
      Aucune personne à afficher !
    </p>

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      hide-footer
      @hide="resetInfoModal"
    >
      <div>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="12"
            label="Modifier la personne"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label="Nom:"
              label-for="nested-Nom"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="nested-Nom"
                type="text"
                v-model="infoModal.content.name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Âge:"
              label-for="nested-Age"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="nested-Age"
                type="number"
                v-model="infoModal.content.age"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Est active:"
              label-cols-sm="3"
              label-align-sm="right"
              class="mb-0"
            >
              <b-form-radio-group
                class="pt-2"
                v-model="infoModal.content.isActive"
                :options="[
                  { text: 'Oui', value: true },
                  { text: 'Non', value: false },
                ]"
              ></b-form-radio-group>
            </b-form-group>
          </b-form-group>
        </b-card>
      </div>
      <b-row style="margin: 3%">
        <b-col offset-sm="9" sm="3">
          <b-button
            block
            variant="success"
            @click="editPerson(infoModal.content)"
            >Editer</b-button
          ></b-col
        >
      </b-row>
    </b-modal>

    <b-row v-if="items.length > 8">
      <b-col md="12" lg="6" offset-lg="3" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import utils from './utils'

export default {
  computed: {
    addIsDisabled () {
      return this.nom.length === 0
    }
  },
  data () {
    return {
      items: [],
      age: 20,
      nom: '',
      isActive: true,
      isBusy: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 8,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: {
          name: '',
          age: '',
          isActive: ''
        }
      },
      activeOptions: [
        { value: true, text: 'Oui' },
        { value: false, text: 'Non' }
      ],
      fields: [
        {
          key: 'name',
          label: 'Nom de la personne',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'age',
          label: 'Âge de la personne',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'isActive',
          label: 'Est Active?',
          formatter: (value, key, item) => {
            return value ? 'Oui' : 'Non'
          },
          sortable: true,
          sortByFormatted: true
        },
        { key: 'actions', label: 'Actions' }
      ]
    }
  },

  mounted: async function () {
    this.isBusy = true
    this.getPersons()
  },

  methods: {
    getPersons () {
      fetch('http://localhost:3001/person/getAll/' + this.$route.params.email)
        .then(async (response) => {
          const json = await response.json()
          if (json) {
            this.items = json
            this.totalRows = this.items.length
            this.isBusy = false
          }
        })
        .catch(function (error) {
          utils.createAlert('Erreur !', error, 'error', 'Fermer')
          this.isBusy = false
        })
    },
    addPerson () {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.$route.params.email,
          name: this.nom,
          age: this.age,
          isActive: this.isActive
        })
      }
      this.isBusy = true
      fetch('http://localhost:3001/person/post', requestOptions)
        .then(async (reponse) => {
          if (reponse.status === 201) {
            this.getPersons()
            this.makeToast(this.nom + ' a été ajouté(e)')
          }
        })
        .catch(function () {
          this.isBusy = false
        })
    },
    editPerson (person) {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: person.name,
          age: person.age,
          isActive: person.isActive
        })
      }
      this.isBusy = true
      fetch('http://localhost:3001/person/update/' + person.id, requestOptions)
        .then(async (response) => {
          if (response.status === 200) {
            this.getPersons()
            this.$root.$emit('bv::hide::modal', this.infoModal.id)
            this.makeToast(
              person.name + ' a été modifié(e)',
              'Personne modifiée',
              'success'
            )
          }
        })
        .catch(function (error) {
          utils.createAlert('Erreur !', error, 'error', 'Fermer')
          this.isBusy = false
        })
    },
    deletePerson (person) {
      this.isBusy = true
      fetch('http://localhost:3001/person/delete/' + person._id, {
        method: 'DELETE'
      })
        .then(async (response) => {
          if (response.status === 200) {
            this.currentPage = 1
            this.getPersons()
            this.makeToast(
              person.name + ' a été supprimé(e)',
              'Personne supprimée',
              'danger'
            )
          }
        })
        .catch(function (error) {
          utils.createAlert('Erreur !', error, 'error', 'Fermer')
          this.isBusy = false
        })
    },
    makeToast (content, title = 'Succès', variant = 'success') {
      this.$bvToast.toast(content, {
        title,
        variant,
        solid: true
      })
    },
    info (item, index, button) {
      this.infoModal.title = `Ligne: ${index + 1} `
      this.infoModal.content = {
        id: item._id,
        name: item.name,
        age: item.age,
        isActive: item.isActive
      }
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = {
        id: '',
        name: '',
        age: '',
        isActive: ''
      }
    }
  }
}
</script>

<style scoped>
.search-bar {
  margin: 2%;
}
.first-row-text {
  margin: 2% auto;
}
p.no-items {
  text-align: center;
  font-style: italic;
}
</style>
