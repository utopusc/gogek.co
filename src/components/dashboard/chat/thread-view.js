'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ChatContext } from './chat-context';
import { MessageAdd } from './message-add';
import { MessageBox } from './message-box';
import { ThreadToolbar } from './thread-toolbar';

// Firebase Firestore importları
import { getFirestoreDb } from '@/lib/firebase/client';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
const db = getFirestoreDb();


function useThread(threadId) {
  const { threads } = React.useContext(ChatContext);
  return threads.find((thread) => thread.id === threadId);
}

export function ThreadView({ threadId }) {
  const thread = useThread(threadId);
  const messagesRef = React.useRef(null);

  const [messages, setMessages] = React.useState([]);
  
  // Firebase'den gerçek zamanlı olarak mesajları almak için useEffect kullanımı
  React.useEffect(() => {
    const messagesCollection = collection(db, 'threads', threadId, 'messages');
    const q = query(messagesCollection, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [threadId]);

  const handleSendMessage = React.useCallback(
    async (type, content) => {
      const messagesCollection = collection(db, 'threads', threadId, 'messages');
      await addDoc(messagesCollection, {
        type,
        content,
        createdAt: serverTimestamp(),
        author: {
          name: 'Current User', // Dinamik kullanıcı adı
          avatar: 'https://placekitten.com/40/40', // Kullanıcının profil resmi
        }
      });
    },
    [threadId]
  );

  // Yeni mesaj geldiğinde listeyi otomatik olarak en alta kaydırma
  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (!thread) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
        <Typography color="textSecondary" variant="h6">
          Thread not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      <ThreadToolbar thread={thread} />
      <Stack ref={messagesRef} spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3 }}>
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </Stack>
      <MessageAdd onSend={handleSendMessage} />
    </Box>
  );
}
