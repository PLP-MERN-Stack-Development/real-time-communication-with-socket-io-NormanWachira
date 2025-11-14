import { useEffect } from 'react';

export const useBrowserNotification = (messages, username) => {
  useEffect(() => {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') Notification.requestPermission();
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage.system && lastMessage.sender !== username) {
      new Notification(`New message from ${lastMessage.sender}`, {
        body: lastMessage.message,
      });
    }
  }, [messages, username]);
};
