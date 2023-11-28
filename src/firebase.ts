import admin from 'firebase-admin';
import * as serviceAccountJson from "../config/api-rastro-urbano.json";
import { ServiceAccount } from 'firebase-admin';
const serviceAccount = serviceAccountJson as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://rastro-urbano.appspot.com', 
});

const bucket = admin.storage().bucket();

export default bucket;
