<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Greet from "./components/Greet.vue";
import {defineComponent, ref} from "vue";

// 全局引入vue-codemirror
import {Codemirror} from "vue-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {oneDark} from "@codemirror/theme-one-dark";
import RibbonBar from "./components/RibbonBar.vue";

const extensions = [java(), oneDark];

// const CodeEditor = defineComponent({
//   name: "Codemirror",
//   components: {
//     Codemirror,
//   },
//
//   setup() {
//     const code = ref(`console.log('Hello, world!')`);
//     const extensions = [javascript(), oneDark];
//
//     return {
//       code,
//       extensions,
//     };
//   }
// })

</script>

<template>
  <div>
    <!--    <h1>Welcome to Tauri!</h1>-->
    <RibbonBar/>

    <Codemirror
        class="code"
        :extensions="extensions"
        :style="{ height: '500px' ,width: '100%'}"
    />

    <!--    <div class="row">-->
    <!--      <a href="https://vitejs.dev" target="_blank">-->
    <!--        <img src="/vite.svg" class="logo vite" alt="Vite logo" />-->
    <!--      </a>-->
    <!--      <a href="https://tauri.app" target="_blank">-->
    <!--        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />-->
    <!--      </a>-->
    <!--      <a href="https://vuejs.org/" target="_blank">-->
    <!--        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
    <!--      </a>-->
    <!--    </div>-->

    <!--    <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>-->

    <!--    <p>-->
    <!--      Recommended IDE setup:-->
    <!--      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>-->
    <!--      +-->
    <!--      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>-->
    <!--      +-->
    <!--      <a href="https://github.com/tauri-apps/tauri-vscode" target="_blank"-->
    <!--        >Tauri</a-->
    <!--      >-->
    <!--      +-->
    <!--      <a href="https://github.com/rust-lang/rust-analyzer" target="_blank"-->
    <!--        >rust-analyzer</a-->
    <!--      >-->
    <!--    </p>-->

    <!--    <Greet />-->

  </div>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

.code {
  display: flex;
  text-align: left;
}

</style>
