import { getApps, initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCDHoWD23jdmmxX21zKM3K8JpfD6EoqHQQ',
  authDomain: 'ethlny-firenuxt.firebaseapp.com',
  projectId: 'ethlny-firenuxt',
  storageBucket: 'ethlny-firenuxt.appspot.com',
  messagingSenderId: '221724593823',
  appId: '1:221724593823:web:e41ddd1768119aab16dcaa',
  measurementId: 'G-XMQ4S1TRNG',
}

export default function useFirebase() {
  if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig)
    //const analytics = getAnalytics(app);
    const auth = getAuth(app)
    const firestore = getFirestore(app)
    const storage = getStorage(app)
    return { app, /* analytics,*/ auth, firestore, storage }
  }
}
