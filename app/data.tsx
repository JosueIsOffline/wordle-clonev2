import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import insertData from '@/db/add-firebase-console';



const data = () => {
    const [status, setStatus] = useState('Iniciando...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Componente Data: Iniciando fetchData...");
                setStatus('Llamando a insertData...');
                await insertData();
                setStatus('Datos insertados correctamente.');
            } catch (e) {
                console.error('Error en fetchData:', e);
                let errorMessage = 'Error desconocido';
                if (e instanceof Error) {
                    errorMessage = `${e.name}: ${e.message}\n${e.stack}`;
                } else if (typeof e === 'string') {
                    errorMessage = e;
                }
                setError(`Error al insertar datos: ${errorMessage}`);
            } finally {
                console.log("Componente Data: Proceso de inserción finalizado");
                setStatus(prev => prev + " Proceso finalizado.");
            }
        };
        fetchData();
    }, []);

    return (
        <View>
            <Text>{status}</Text>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}

export default data