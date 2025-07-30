/*
 * @Author       : yinming 1090538449@qq.com
 * @Date         : 2025-07-30 09:59
 * @LastEditors  : yinming 1090538449@qq.com
 * @LastEditTime : 2025-07-30 10:02
 * @FilePath     : \socket_client_vue3_test\src\utils\socket.ts
 * @Description  :
 */
import {io, Socket} from 'socket.io-client';

const socket: Socket = io('http://localhost:3000', {
  autoConnect: false,
  transports: ['websocket']
})
export default socket;