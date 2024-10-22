import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc} from "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from "@env";
import nanniesData from './Nannies.json'; // Importa el archivo JSON directamente

// Configuración de Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase inicializado. Instancia de Firestore creada.");

// Importar los datos a Firestore
const importDataToFirestore = async () => {
  try {
    const nannies = nanniesData; // Los datos ya están importados del JSON

    for (const [id, nanny] of Object.entries(nannies)) {
      // Crear un documento en Firestore con el ID específico
      const docRef = doc(db, 'testing', id);
      await setDoc(docRef, nanny)
      console.log(`Datos de la niñera con ID ${id} agregados a la colección.`);
    }

    console.log('Importación completada.');
  } catch (error) {
    console.error('Error al importar los datos a Firestore:', error);
  }
};

// Llamar a la función para importar los datos
importDataToFirestore();

export { db }
