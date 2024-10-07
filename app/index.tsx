import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

export default function Index() {

  interface Product {
    id: string;
    name: string;
  }
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  
  const products: Product[] = [
    { id: '1', name: 'PlayStation 5' },
    { id: '2', name: 'Xbox Series X' },
    { id: '3', name: 'Nintendo Switch' },
    { id: '4', name: 'PlayStation 4' },
    { id: '5', name: 'Xbox One' },
    { id: '6', name: 'Nintendo Switch Lite' },
    { id: '7', name: 'PlayStation 5 Digital Edition' },
    { id: '8', name: 'Xbox Series S' },
    { id: '9', name: 'Nintendo Switch OLED' },
    { id: '10', name: 'PlayStation VR2' },
  ];

    const handleSearch = (query: string) => {
      setSearchQuery(query);
      if (query) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
    };
  

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search consoles"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.productItem}>{item.name}</Text>
          )}
          ListEmptyComponent={<Text>No hay resultados</Text>}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  productItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});