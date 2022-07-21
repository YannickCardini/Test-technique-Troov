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
    <!-- Search bar -->
    <!-- <b-row v-if="items.length > 0">
      <b-col lg="6" class="search-bar">
        <b-form-group
          label="Recherche"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Tapez pour rechercher"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Effacer</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row> -->

    <!-- Main table element -->
    <b-table
      v-if="items.length > 0"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :busy="isBusy"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      small
      @filtered="onFiltered"
    >
      <!-- <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template> -->

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

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Chargement...</strong>
        </div>
      </template>
    </b-table>

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
const utils = require("./utils.js");

export default {
  computed: {
    addIsDisabled() {
      return this.nom.length == 0;
    },
  },
  data() {
    return {
      items: [],
      age: 20,
      nom: "",
      isActive: true,
      isBusy: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 8,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      activeOptions: [
        { value: true, text: "Oui" },
        { value: false, text: "Non" },
      ],
      fields: [
        {
          key: "name",
          label: "Nom de la personne",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "age",
          label: "Âge de la personne",
          sortable: true,
          class: "text-center",
        },
        {
          key: "isActive",
          label: "Est Active?",
          formatter: (value, key, item) => {
            return value ? "Oui" : "Non";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: "actions", label: "Actions" },
      ],
    };
  },

  mounted: async function () {
    this.isBusy = true;
    this.getPersons();
  },

  methods: {
    getPersons() {
      fetch("http://localhost:3001/person/getAll/" + this.$route.params.email)
        .then(async (response) => {
          const json = await response.json();
          if (json) {
            this.items = json;
            this.totalRows = this.items.length;
            this.isBusy = false;
          }
        })
        .catch(function (error) {
          utils.createAlert("Erreur !", error, "error", "Fermer");
          this.isBusy = false;
        });
    },
    addPerson() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.$route.params.email,
          name: this.nom,
          age: this.age,
          isActive: this.isActive,
        }),
      };
      this.isBusy = true;
      fetch("http://localhost:3001/person/post", requestOptions)
        .then(async (reponse) => {
          if (reponse.status == 201) {
            this.getPersons();
            this.makeToast(this.nom + " a été ajouté(e)");
          }
        })
        .catch(function (error) {
          this.isBusy = false;
        });
    },
    deletePerson(person) {
      this.isBusy = true;
      fetch("http://localhost:3001/person/delete/" + person._id, {
        method: "DELETE",
      })
        .then(async (response) => {
          if (response.status == 200) {
            this.currentPage =  1;
            this.getPersons();
            this.makeToast(
              person.name + " a été supprimé(e)",
              "Personne supprimée",
              "danger"
            );
          }
        })
        .catch(function (error) {
          utils.createAlert("Erreur !", error, "error", "Fermer");
          this.isBusy = false;
        });
    },
    makeToast(content, title = "Succès", variant = "success") {
      this.$bvToast.toast(content, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin: 2%;
}
.first-row-text {
  margin: 2% auto;
}
</style>