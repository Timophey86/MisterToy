<template>
  <div class="edit">
    <form v-if="toyToEdit" @submit.prevent="submitToy" class="main-container">
      <input required type="text" v-model="toyToEdit.name" />
      <input
        type="number"
        placeholder="Price"
        v-model.number="toyToEdit.price"
      />
      <select v-model="toyToEdit.type" id="set-toys">
        <option value="Funny">Funny</option>
        <option value="Adult">Adult</option>
        <option value="Educational">Educational</option>
      </select>
      <button>sumbit</button>
    </form>
  </div>
</template>

<script>
import { toyService } from "../services/toy.service.js";

export default {
  data() {
    return {
      toyToEdit: null,
    };
  },
  methods: {
    submitToy() {
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToEdit })
        .then(() => {
          this.$router.push("/app");
        });
    },
  },
  created() {
    const id = this.$route.params.toyId;
    if (id) {
      toyService.getById(id).then((toy) => (this.toyToEdit = toy));
    } else {
      this.toyToEdit = toyService.getEmptyToy();
    }
  },
};
</script>
