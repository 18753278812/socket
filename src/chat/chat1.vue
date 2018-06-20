<template>
    <div class="chat">
        <div class="chat1"></div>
        <input type="text" v-model="message"/>
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
      name: "chat1",
      message: ""
    };
  },
  mounted() {
    this.socket = io("http://localhost:8089"); // 注册一个socket通信
    this.socket.on("setMessage", msg => { // 等待后端调用
      document.querySelector(".chat1").innerHTML += `<br />${msg.name}:${
        msg.message
      }`;
    });
  },
  methods: {
    send() {
      this.socket.emit("getMessage", { // 对应后端
        name: this.name,
        message: this.message
      });
      document.querySelector(".chat1").innerHTML += `<br />${this.name}:${
        this.message
      }`;
      this.message = ''
    }
  }
};
</script>