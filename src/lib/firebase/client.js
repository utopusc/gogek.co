'use client';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { config } from '@/config';

// Bu kod, yalnızca istemcide çalışır, bu yüzden appInstance burada önbelleğe alınır.
let appInstance;
let dbInstance;

export function getFirebaseApp() {
  if (!appInstance) {
    appInstance = initializeApp({
      apiKey: config.firebase.apiKey,
      authDomain: config.firebase.authDomain,
      projectId: config.firebase.projectId,
      storageBucket: config.firebase.storageBucket,
      messagingSenderId: config.firebase.messagingSenderId,
      appId: config.firebase.appId,
    });
  }

  return appInstance;
}

// Firestore veritabanını almak için bir fonksiyon ekleyin
export function getFirestoreDb() {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }

  return dbInstance;
}
