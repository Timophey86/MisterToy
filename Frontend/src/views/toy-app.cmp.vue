<template>
  <section class="toy-app main-container">
    <div class="welcome">
      <h2>Welcome</h2>
      <!-- <router-link to="/user-profile">To User Profile</router-link><br> -->
      <router-link to="/toy/edit/">Add a new Toy</router-link>
    </div>
    <toy-filter @setFilter="setFilter" @setSort="setSort"/>
    <toy-list :toys="toys" />
    <pop-up v-if="isModalVisible" @close="closeModal"/>
    <img class="chat-icon" @click="openModal" src="../assets/chat-bubble-with-lines.svg" alt="">
  </section>
</template>


<script>
import { toyService } from "../services/toy.service.js";
import toyList from "../components/toy-list.cmp.vue";
import toyEdit from "../views/toy-edit.cmp.vue";
import toyFilter from "../components/toy-filter.cmp.vue";
import popUp from "../components/pop-up.cmp.vue"

export default {
  data() {
    return {
      toyToEdit: toyService.getEmptyToy(),
      isModalVisible: false
    };
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
    username() {
      return this.$store.state.user.fullName;
    },
  },
  components: {
    toyList,
    toyEdit,
    toyFilter,
    popUp
  },
  methods: {
    setFilter(filter) {
      this.$store.dispatch({ type: "setFilter", filter: filter });
    },
    setSort(sort) {
      this.$store.dispatch({ type: "setSort", sort: sort });
    },
    loadToys() {
      this.$store.dispatch({ type: "loadToys" });
    },
    closeModal() {
      this.isModalVisible=false
    },
    openModal() {
      this.isModalVisible=true
    }
  },
  created() {
    this.loadToys();
  },
};
</script>