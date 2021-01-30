import { useContext } from 'react';
import { FirebaseContext } from '../components/firebase/Firebase';

export default function useFirebase() {
  return useContext(FirebaseContext);
}
