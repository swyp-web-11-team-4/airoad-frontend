import { Client } from "@stomp/stompjs";

export function createStompClient(brokerURL: string, token?: string) {
  const client = new Client({
    brokerURL,
    reconnectDelay: 3000,
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return client;
}
