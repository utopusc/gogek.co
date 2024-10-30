'use client';

import * as React from 'react';
import { onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestoreDb } from '@/lib/firebase/client';
import { ChatProvider } from '@/components/dashboard/chat/chat-context';
import { ChatView } from '@/components/dashboard/chat/chat-view';

const db = getFirestoreDb();

export default function Layout({ children }) {
  const [contacts, setContacts] = React.useState([]);
  const [threads, setThreads] = React.useState([]);
  const [messages, setMessages] = React.useState([]);

  // Firestore'dan verileri çekmek için useEffect kullanıyoruz
  React.useEffect(() => {
    const contactsCollection = collection(db, 'contacts');
    const threadsCollection = collection(db, 'threads');
    const messagesCollection = collection(db, 'messages');

    const unsubscribeContacts = onSnapshot(contactsCollection, (snapshot) => {
      const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsData);
    });

    const unsubscribeThreads = onSnapshot(threadsCollection, (snapshot) => {
      const threadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setThreads(threadsData);
    });

    const unsubscribeMessages = onSnapshot(messagesCollection, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    });

    return () => {
      unsubscribeContacts();
      unsubscribeThreads();
      unsubscribeMessages();
    };
  }, []);

  // Yeni bir grup oluşturma işlevi
  const createGroupThread = async () => {
    await addDoc(collection(db, 'threads'), {
      type: 'group',
      participants: [
        { id: 'USR-000', name: 'Current User', avatar: '/assets/avatar.png' },
        { id: 'USR-001', name: 'Another User', avatar: '/assets/avatar-1.png' }
      ],
      createdAt: serverTimestamp(),
      unreadCount: 0,
    });
  };

  // İlk grup sohbetini oluşturmak için useEffect
  React.useEffect(() => {
    if (threads.length === 0) {
      createGroupThread();
    }
  }, [threads]);

  return (
    <ChatProvider contacts={contacts} messages={messages} threads={threads}>
      <ChatView>{children}</ChatView>
    </ChatProvider>
  );
}
