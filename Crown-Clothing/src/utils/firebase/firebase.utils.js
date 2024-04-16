import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  writeBatch, 
  query, 
  getDocs 
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBHADpIn3bkd6n_5Yw5cPzLSdTg3npkueU",
    authDomain: "crwn-clothing-db-2c840.firebaseapp.com",
    projectId: "crwn-clothing-db-2c840",
    storageBucket: "crwn-clothing-db-2c840.appspot.com",
    messagingSenderId: "907795717887",
    appId: "1:907795717887:web:dac1c3cee5e202bd76b6ca"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

const auth = getAuth();
const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit();
  console.log('Batch is committed');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, snapshot) => {
    const { title, items } = snapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {})

  return categoryMap;
}

export const createUserDocFromAuth = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName , email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
}
