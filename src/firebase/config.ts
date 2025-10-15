import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD7KChP9EmjPjEJXYWZAvKCsQZKlISlJhg",
  authDomain: "clip-sharing-dcae3.firebaseapp.com",
  projectId: "clip-sharing-dcae3",
  storageBucket: "clip-sharing-dcae3.firebasestorage.app",
  messagingSenderId: "590042719399",
  appId: "1:590042719399:web:87cfdbd194baefc00de782",
  measurementId: "G-3JTEJEMM1G",
  databaseURL: "https://clip-sharing-dcae3-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
