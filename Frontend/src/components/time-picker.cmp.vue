<template>
  <section class="user-profile">
    <form action="">
    <input v-bind:value="hour" v-on:change="updateColock($event.target.value)" type="number"> <br>
    </form>
  </section>
</template>


<script>
export default {
  props: ["hour"],
  data() {
    return {
    };
  },
  methods: {
    updateColock(value) {
      this.$emit("input",JSON.parse(value));
    },
  },
  mounted() {
      
  },
};
</script>