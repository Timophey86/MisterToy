<template>
  <div class="filter-sort-container">
    <form class="filter main-container" @submit.prevent="setFilter">
      <label for="filter-toys">Filter: </label>
      <select @change="setFilter" v-model="filterBy.inStock">
        <option value="all">All</option>
        <option value="true">In Stock</option>
        <option value="false">Out Of Stock</option>
      </select>
      <select @change="setFilter" v-model="filterBy.type">
        <option value="all">All</option>
        <option value="Funny">Funny</option>
        <option value="Adult">Adult</option>
        <option value="Educational">Educational</option>
      </select>
      <label>
        Search
        <input
          ref="txtSearch"
          type="text"
          @input="setFilter"
          v-model="filterBy.name"
        />
      </label>
      <button>Search</button>
    </form>
    <form class="sort">
      <label for="sort-toys">Sort By: </label>
      <select @change="setSort" v-model="sortBy.sortType">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </form>
  </div>
</template>



<script>
export default {
  name: "Filter-Toys",
  data() {
    return {
      filterBy: { name: "", inStock: "all", type: "all" },
      sortBy: { sortType: "name" },
    };
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", this.filterBy);
    },
    setSort() {
      this.$emit("setSort", this.sortBy);
    },
  },

  mounted() {
    this.$refs.txtSearch.focus();
  },
};
</script>