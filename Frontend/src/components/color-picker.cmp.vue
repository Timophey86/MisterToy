<template>
  <section class="user-profile">
    <form action="">
      <input
        type="color"
        id="head"
        name="head"
        v-bind:value="color"
        v-on:change="updateColor($event.target.value)"
      />
    </form>
  </section>
</template>


<script>
export default {
  props: ["color"],
  data() {
    return {
    };
  },
  methods: {
    updateColor(value) {
      this.$emit("input", value);
    },
  },
  created() {},
};
</script>