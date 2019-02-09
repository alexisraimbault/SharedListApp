import Firebase from 'firebase';
export const firebaseConfig = {
    apiKey: "AIzaSyAE6nn-JOA9BQs2Z_QlZ76oIHf5xkKstpo",
    authDomain: "sharedlist-3e575.firebaseapp.com",
    databaseURL: "https://sharedlist-3e575.firebaseio.com",
    projectId: "sharedlist-3e575",
    storageBucket: "sharedlist-3e575.appspot.com",
    messagingSenderId: "711233545653"
  };
  let app = Firebase.initializeApp(firebaseConfig);
  export const db = app.database();
