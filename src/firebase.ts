const admin = require("firebase-admin");
const serviceAccount = require("../config/api-rastro-urbano.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://rastro-urbano.appspot.com', // Substitua pelo nome do seu bucket de armazenamento
});

const bucket = admin.storage().bucket();

module.exports = bucket;
