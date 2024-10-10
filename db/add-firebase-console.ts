import { collection, addDoc, getDocs, DocumentReference } from 'firebase/firestore'
import { db } from '../firebaseConfig.js'

import data from './data.js'

interface Product {
    name: string;
    price: number;
}

const testFirebase = async () => {
    console.log("Iniciando prueba de conexión...");
    try {
      console.log("Intentando acceder a la colección 'test'...");
      const testCollection = collection(db, "test");
      console.log("Colección 'test' accedida correctamente.");
  
      console.log("Intentando agregar documento de prueba...");
      const addDocPromise = addDoc(testCollection, {
        test: "Prueba de conexión",
        timestamp: new Date()
      });
  
      console.log("Promesa de addDoc creada. Esperando resolución...");
  
      // Establecer un tiempo de espera de 10 segundos
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => {
          console.log("Tiempo de espera excedido");
          reject(new Error("Tiempo de espera excedido al agregar documento"));
        }, 10000)
      );
  
      console.log("Iniciando Promise.race...");
      const docRef = await Promise.race([addDocPromise, timeoutPromise]) as DocumentReference;
      console.log("Promise.race completado. Documento de prueba agregado con ID: ", docRef.id);
  
      // ... resto del código ...
    } catch (e) {
      console.error("Error en la prueba de conexión: ", e);
      if (e instanceof Error) {
        console.error("Mensaje de error:", e.message);
        console.error("Stack trace:", e.stack);
      }
      throw e;
    }
  };
  
  const insertData = async () => {
      console.log("Iniciando insertData...");
      try {
          console.log("Ejecutando prueba de conexión...");
          await testFirebase();
          console.log("Prueba de conexión completada.");
  
          console.log("Iniciando inserción de productos...");
          for (const product of data) {
              try {
                  console.log(`Intentando insertar producto: ${product.name}`);
                  const docRef = await addDoc(collection(db, "test"), product);
                  console.log(`Producto insertado correctamente: ${product.name} con ID: ${docRef.id}`);
              } catch (error) {
                  console.error(`Error al insertar producto ${product.name}:`, error);
                  throw error;
              }
          }
          console.log("Todos los productos se agregaron correctamente");
      } catch (e) {
          console.error("Error en insertData: ", e);
          throw e;
      }
      console.log("insertData completado");
  };

export default insertData