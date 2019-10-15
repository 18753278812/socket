<template>
    <div class="chat">
        <div class="chat1"></div>
        <input type="text" v-model="message"/>
        <button @click="send">发送</button>
        <button @click="exit" v-if="isoline">退出</button>
        <button @click="join" v-if="!isoline">加入</button>
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
      name: ['爸爸','孙子','儿子'],
      currentName: '',
      message: "",
      isoline: true
    };
  },
  mounted() {
    this.currentName = this.name[parseInt(Math.random() * this.name.length)]
    this.socket = io("http://localhost:8089"); // 注册一个socket通信
    this.socket.on("setMessage", msg => { // 等待后端调用
      console.log(msg)
      document.querySelector(".chat1").innerHTML += `<br />${msg.name}:${
        msg.message
      }`;
    });
    this.socket.emit("join", {
      name: this.currentName
    })
    this.socket.on("join", msg => {
      document.querySelector(".chat1").innerHTML += `<br />${msg.name}${
        msg.message
      }`;
    })
  },
  methods: {
    send() {
      this.socket.emit("getMessage", { // 对应后端
        name: this.currentName,
        message: this.message
      });
      this.message = ''
    },
    exit() {
      this.socket.emit("disconn", {
        name: this.currentName
      })
      this.isoline = false
    },
    join() {
      this.socket = io("http://localhost:8089"); // 注册一个socket通信
      this.socket.on("setMessage", msg => { // 等待后端调用
        document.querySelector(".chat1").innerHTML += `<br />${msg.name}:${
          msg.message
        }`;
      });
      this.socket.emit("join", {
        name: this.currentName
      })
      this.isoline = true
    }
  },
  destroyed() {
    this.exit()
  }
};
</script>