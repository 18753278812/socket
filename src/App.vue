<template>
  <div id="app">
    <chat1 />
    <!-- <chat2 /> -->
  </div>
</template>

<script>
import io from "socket.io-client";
import chat1 from "./chat/chat1.vue";
// import chat2 from "./chat/chat2.vue";
export default {
  name: "app",
  components: {
    chat1,
    // chat2
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
