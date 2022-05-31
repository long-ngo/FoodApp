import { getDatabase, ref, onValue } from 'firebase/database';
import './config';

const db = getDatabase();

function getData(url) {
  const starCountRef = ref(db, url);
  let data;
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });
  return data;
}

export { getData };
