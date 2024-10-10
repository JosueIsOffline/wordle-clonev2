import { View, Text, Image, StyleSheet } from 'react-native';
import { Highlight } from 'react-instantsearch-native'
import React from 'react'

export const Hit =  ({ hit }: { hit: any }) => {
    return (
      <View style={styles.container}>
        {/* Adaptar la imagen usando el componente Image */}
        <Image source={{ uri: hit.backdrop_path }} style={styles.image} />
  
        {/* Usar Text en lugar de div para los textos */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            <Highlight attribute="original_title" hit={hit} />
          </Text>
  
          <Text style={styles.overview}>
            <Highlight attribute="overview" hit={hit} />
          </Text>
  
          <Text style={styles.releaseDate}>
            <Highlight attribute="release_date" hit={hit} />
          </Text>
        </View>
      </View>
    );
  };
  
  // Estilos para el componente
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 10,
    },
    textContainer: {
      padding: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    overview: {
      fontSize: 14,
      marginBottom: 5,
    },
    releaseDate: {
      fontSize: 12,
      color: '#888',
    },
  });