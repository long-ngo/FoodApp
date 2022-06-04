import { initializeApp, getApps } from 'firebase/app';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// const firebaseConfig1 = {
//   apiKey: 'AIzaSyCaXqA5515L0H0kZA2nKgvF6rku28BPX0M',
//   authDomain: 'hoangducluudemofibase1.firebaseapp.com',
//   databaseURL: 'https://hoangducluudemofibase1-default-rtdb.firebaseio.com',
//   projectId: 'hoangducluudemofibase1',
//   storageBucket: 'hoangducluudemofibase1.appspot.com',
//   messagingSenderId: '11033715398',
//   appId: '1:11033715398:web:99c2377f2d933f22d12dc7',
//   measurementId: 'G-B1402V5HDB'
// };

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
