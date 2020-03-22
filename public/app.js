document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  const db = firebase.firestore();
  const post = db.collection("test");

  post.get().then(res => {
    res.forEach(post => {
      const data = post.data();
      console.log(data);
    });
  });
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
    });
}

function uploadFile(files) {
  const storageRef = firebase.storage().ref();
  const horseRef = storageRef.child("horse.jpg");

  const file = files.item(0);
  const task = horseRef.put(file);

  task.then(snapshot => {
    snapshot.ref.getDownloadURL().then(url => {
      document.querySelector("#imgUpload").setAttribute("src", url);
    });
  });
}
