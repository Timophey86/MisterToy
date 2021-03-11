<template>
  <div>
    <ul class="chat-logs" v-if="mesaages.length">
      <li v-for="(msg, idx) in mesaages" :key="idx" :class="{isUserMsg:msg.isUserMsg}">
       {{msg.sender}}: {{ msg.msg }}
      </li>
    </ul>
  <div class="no-msgs" v-else>No messages to show yet</div>
  </div>
</template>


<<script>
  export default {
      name: 'chat',
      props:["mesaages"],
    methods: {
    },
  };
</script>