import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBu5WyYomNvWKVnDp0FOAXj8sbWg86Bpik',
  authDomain: 'functionjunction-dev.firebaseapp.com',
  databaseURL: 'https://functionjunction-dev-default-rtdb.firebaseio.com',
  projectId: 'functionjunction-dev',
  storageBucket: 'functionjunction-dev.appspot.com',
  messagingSenderId: '876555321057',
  appId: '1:876555321057:web:4ffb8a00c81ad6ee4441a0',
});

export const auth = app.auth();
export const db = getFirestore(app);

export default app;
