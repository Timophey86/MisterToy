<template>
  <section class="toy-details main-container">
    <div v-if="toyForDisplay">
      <h2>{{ toyForDisplay.name}}</h2>
      <h4>Category: {{ toyForDisplay.type}}</h4>
      <h4>Price: {{toyForDisplay.price}} $</h4>
      <h4>In Stock: {{toyForDisplay.inStock}}</h4>
    </div>
    <router-link to="/app">Back</router-link>
  </section>
</template>



<script>
export default {
  computed: {
    toyForDisplay() {
      return this.$store.getters.toyForDetails;
    },
  },
  created() {
    const id = this.$route.params.toyId;
    this.$store.commit({ type: "getToyForDisplay", id });
  },
};
</script>