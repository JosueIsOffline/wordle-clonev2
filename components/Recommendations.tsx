import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Button, Pressable } from "react-native";
import { useLookingSimilar } from "react-instantsearch";

interface Hit {
  objectID: string;
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
}

interface CustomLookingSimilarProps {
  objectID: string;
  onBack: () => void;
}

const CustomLookingSimilar: React.FC<CustomLookingSimilarProps> = (props) => {
  const { items } = useLookingSimilar({
    objectIDs: [props.objectID],
  });

  const renderItem = ({ item }: { item: Hit }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.poster_path}} style={styles.image} />
      <View style={styles.textContainer}>
      <Text style={styles.title}>{item.original_title}</Text>
      <Text style={styles.overview}>{item.overview}</Text>
      <Text style={styles.releaseDate}>{item.release_date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.recommendationsContainer}>
      <Pressable style={styles.button} onPress={props.onBack}>
        <Text style={styles.text}>Back</Text>
      </Pressable>
      <FlatList
        data={items as Hit[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.objectID}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendationsContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  overview: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4, 
  },
  releaseDate: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 20, 
    borderRadius: 5,
    alignSelf: 'center', 
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});



export default CustomLookingSimilar;
