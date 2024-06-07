import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  NextOrObserver
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  writeBatch, 
  query, 
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { Category } from '../../store/categories/category.type';

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

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit();
  console.log('Batch is committed');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(snapshot => snapshot.data() as Category);
}

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocFromAuth = async (
  userAuth: User, 
  additionalData = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error creating the user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserFromEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUser) => {
        unsubscribe();
        resolve(authUser);
      },
      reject
    );
  });
};
