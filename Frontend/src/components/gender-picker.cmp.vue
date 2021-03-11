<template>
  <section class="user-profile">
    <form action="">
      <select
        v-bind:value="gender"
        v-on:change="updateGender($event.target.value)"
      >
        <option disabled value="">Please Pick Your Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Else</option>
      </select>
    </form>
  </section>
</template>


<script>
export default {
  props: ["gender"],
  data() {
    return {
    };
  },
  methods: {
    updateGender(value) {
      this.$emit('input', value)
    },
  },
  created() {},
};
</script>