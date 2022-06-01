import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC9ibS5Kc6KAQ4jIUKGP8KdLJG0-nRm6tk',
  authDomain: 'foodapp-b777a.firebaseapp.com',
  databaseURL: 'https://foodapp-b777a-default-rtdb.firebaseio.com',
  projectId: 'foodapp-b777a',
  storageBucket: 'foodapp-b777a.appspot.com',
  messagingSenderId: '245159754938',
  appId: '1:245159754938:web:d1b63c6841f9f8d3ab5683',
  measurementId: 'G-D6JDRR4JL7'
};

const firebaseConfig1 = {
  apiKey: 'AIzaSyCaXqA5515L0H0kZA2nKgvF6rku28BPX0M',
  authDomain: 'hoangducluudemofibase1.firebaseapp.com',
  databaseURL: 'https://hoangducluudemofibase1-default-rtdb.firebaseio.com',
  projectId: 'hoangducluudemofibase1',
  storageBucket: 'hoangducluudemofibase1.appspot.com',
  messagingSenderId: '11033715398',
  appId: '1:11033715398:web:99c2377f2d933f22d12dc7',
  measurementId: 'G-B1402V5HDB'
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
