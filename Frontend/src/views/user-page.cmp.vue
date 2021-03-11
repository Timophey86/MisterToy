<template>
  <section class="user-profile" :style="myStyle">
    <h2>Welcome {{ User.name }}</h2>
    <p>{{ User.gender }}</p>
    <p>{{ hours }}: {{ minutes }}</p>
    Pick an hour: <time-picker v-model="timePicked.hour" /> Pick a minute:
    <time-picker v-model="timePicked.minute" />
    <gender-picker v-model="User.gender" />
    <color-picker v-model="myStyle.backgroundColor" />
  </section>
</template>


<script>
import genderPicker from "../components/gender-picker.cmp.vue";
import colorPicker from "../components/color-picker.cmp.vue";
import timePicker from "../components/time-picker.cmp.vue";

export default {
  data() {
    return {
      User: { name: "Timmy", gender: "Male" },
      timePicked: {
        hour: 18,
        minute: 23,
      },
      myStyle: {
        backgroundColor: "#16a085",
        color: "black",
      },
    };
  },
  computed: {
    minutes() {
      if (this.timePicked.minute < 0) {
        this.timePicked.minute = 23;
        return this.timePicked.minute;
      } else {return this.timePicked.minute;}
    },
    hours() {
      if (this.timePicked.hour < 0) {
        this.timePicked.hour = 23;
        return this.timePicked.hour;
      } else {return this.timePicked.hour}
    },
  },
  methods: {},
  created() {},
  components: {
    genderPicker,
    colorPicker,
    timePicker,
  },
};
</script>