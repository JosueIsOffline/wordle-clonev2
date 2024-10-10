import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-930rx9TmRAHRpawVEJTaaURZUamEGwg",
  authDomain: "wrodle-clonev2-3412.firebaseapp.com",
  projectId: "wrodle-clonev2-3412",
  storageBucket: "wrodle-clonev2-3412.appspot.com",
  messagingSenderId: "625472040479",
  appId: "1:625472040479:web:cc3d0f79a4137ddf29af2a"
};

console.log("Configuración de Firebase:", JSON.stringify(firebaseConfig, null, 2));
console.log("Inicializando Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase inicializado. Instancia de Firestore creada.");
console.log("Proyecto ID:", app.options.projectId);

export { db };