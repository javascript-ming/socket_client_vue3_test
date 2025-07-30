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
      <input type="text" v-modal="message" @keyup.enter="sendMsg" placeholder="请输入消息" />
    </section>
  </div>
</template>
<script lang="ts" setup>
  import {ref, onMounted, onUnmounted } from 'vue';
  import socket from '@/utils/socket';

  const message =ref('');
  const messages = ref<string[]>([]);

  const sendMsg = () => {
    if(message.value.trim()) {
      socket.emit('chat message: ', message.value);
      message.value = '';
    }
  }
  onMounted(() => {
    // 需要进行通信的时候才创建连接
    socket.connect();
    socket.on("connect", () => {
      console.log('connect success');
    })
    socket.on('disconnect', () => {
      console.log('disconnected');
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
