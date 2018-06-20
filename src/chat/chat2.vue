<template>
    <div class="chat">
        <div class="chat2"></div>
        <input v-model="message"/>
        <button @click="send">发送</button>
    </div>
</template>
<style>
.chat {
  width: 50%;
  float: left;
}
</style>
<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      name: "chat2",
      message: ""
    };
  },
  mounted() {
    this.socket = io("http://localhost:8089");
    this.socket.send(this.name);
    this.socket.on("setMessage", msg => {
      document.querySelector(".chat2").innerHTML += `<br />${msg.name}:${
        msg.message
      }`;
    });
  },
  methods: {
    send() {
      this.socket.emit("getMessage", {
        name: this.name,
        message: this.message
      });
      document.querySelector(".chat2").innerHTML += `<br />${this.name}:${
        this.message
      }`;
      this.message = ''
    }
  }
};
</script>