const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore
  .document("products/{productId}")
  .onCreate(event => {
    const docId = event.params.productId;

    const name = event.data.data().name;

    const productRef = admin
      .firestore()
      .collection("products")
      .doc(docId);

    return productRef.update({ message: "hello" });
  });
