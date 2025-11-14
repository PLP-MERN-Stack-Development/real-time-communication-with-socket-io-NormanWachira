import { useEffect } from 'react';

export const useNotificationSound = (messages) => {
  useEffect(() => {
    if (!messages.length) return;
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage.system) {
      const audio = new Audio('/notification.mp3'); // place notification.mp3 in public/
      audio.play().catch(() => console.log('Audio play failed'));
    }
  }, [messages]);
};
