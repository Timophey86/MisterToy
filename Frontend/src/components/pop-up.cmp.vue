<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Contact Our Support
          <button type="button" class="btn-close" @click="close">x</button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          <chat-app :mesaages="messsages"> </chat-app>
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <form action="" @submit.prevent="sendMsg">
            <input
              type="text"
              placeholder="Enter message to support"
              v-model="activeMsg.msg"
            /><button>Send</button>
          </form>
          <button type="button" class="btn-green" @click="close">
            Close me!
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>


<<script>
import chatApp from "./caht-app.cmp.vue"


  export default {
    name: 'modal',
    data () {
        return {
            messsages:[],
            activeMsg: {sender:"User",msg:"", isUserMsg: true}
        }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      sendMsg() {
          this.messsages.push(this.activeMsg)
          setTimeout(this.sendAutoReply, 2000)
      },
      sendAutoReply() {
          this.messsages.push({sender:"Support", msg:"Sure thing homie", isUserMsg: false})
      }
    },
    components: {
        chatApp
    },
    mounted() {
    let self = this; 
    window.addEventListener('keyup', (ev) => {
     if (ev.keyCode === 27)  {this.close()} 
    });
}

  };
</script>

