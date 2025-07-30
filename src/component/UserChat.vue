<template>
  <div>
    <h3>聊天室</h3>
    <section class="messages-wrap">
      <ul>
        <li v-for="(msg, index) in messages" :key="index">
          {{ msg }}
        </li>
      </ul>
    </section>
    <section>
      <input type="text" v-modal="message" placeholder="请输入消息" @change="changeFn"/><button @click="sendMsg">发送</button>
    </section>
  </div>
</template>
<script lang="ts" setup>
  import {ref, onMounted, onUnmounted } from 'vue';
  import socket from '@/utils/socket';
  const token = localStorage.getItem('token') || 'testUser';
  const message =ref('');
  const messages = ref<string[]>([]);
  const changeFn = (e: Event) => {
    console.log(e)
    if(e.target && e.target instanceof HTMLInputElement) {
      message.value = e.target.value;
    }
  }
  const sendMsg = () => {
    if(message.value.trim()) {
      socket.emit('chat message', message.value);
      message.value = '';
    }
  }
  onMounted(() => {
    // 需要进行通信的时候才创建连接
    // 携带token
    socket.auth = {
      token
    }
    socket.connect();
    socket.on("connect", () => {
      console.log('connect success');
    })
    socket.on('disconnect', () => {
      console.log('disconnected');
    })
    socket.on('connect_error', (err: Error) => {
      console.log('连接失败: ', err.message);
    })
    socket.on('chat message', (msg: string) => {
      if(!msg.length) {
        return;
      }
      messages.value.push(msg);
    });
    onUnmounted(() => {
      socket.disconnect();
    })
  })
</script>
