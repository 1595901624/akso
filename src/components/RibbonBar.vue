<script setup lang="ts">
import {ref} from "vue";
import {message} from "ant-design-vue";

import {BuildFilled, FolderOpenFilled} from '@ant-design/icons-vue';

const greetMsg = ref("");
const name = ref("");

const activeKey = ref('2');

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  // greetMsg.value = await invoke("greet", {name: name.value});
  message.info("213123");
}
</script>

<template>
  <div class="ribbon">
    <a-tabs class="ribbon-tab" v-model:activeKey="activeKey" type="card">
      <a-tab-pane class="ribbon-tab-pane" key="1" tab="Start">
        <div class="ribbon-tab-button">
          <folder-open-filled :style="{fontSize: '20px', color: '#08c'}"/>
          <p class="ribbon-tab-text">Open</p>
        </div>
        <a-divider type="vertical" style="height: 0px; "/>
        <div class="ribbon-tab-button">
          <build-filled :style="{fontSize: '20px', color: '#08c'}"/>
          <p class="ribbon-tab-text">Compile</p>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tools">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Help">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
    <!--    <folder-open-outlined/>-->
  </div>
</template>

<style>
.ribbon {
  /*background: #396cd8;*/
  width: 100%;
  height: 120px;
}

.ribbon-tab {
  padding: 0;
  /*height: 140px;*/
  /*height: 120px;*/
  margin-left: 16px;
  /*margin-top: -16px;*/
}

.ribbon-tab-pane {
  display: flex;
  flex-direction: row;
  padding: 0;
  height: 100%;
  margin-left: 10px;
}

.ribbon-tab-text {
  text-align: center;
  font-size: 1px;
}

.ribbon-tab-button {
  padding: 6px 4px;
  margin-top: -6px;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.ribbon-tab-button:hover{
  border-radius: 5px;
  cursor: pointer;
  background-color: #efebeb;
}

.tab-icon {
  fontSize: 60px;
}
</style>