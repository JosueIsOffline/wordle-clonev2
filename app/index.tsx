
import React, { useState } from "react";
import { InstantSearch } from "react-instantsearch-core";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import InfinityHits from "@/components/InfinityHits";
import SearchBox from "@/components/SearchBox";


const searchClient = algoliasearch('YNZK52PRU0', '441fe7e3eb93f5cbfd485f2aff8ae473')

export default function Index() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content"/>
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="movie">
          <SearchBox />
          <InfinityHits hitComponent={Hit}/>
        </InstantSearch>
      </View>
    </SafeAreaView>
  )
}

function Hit({ hit }: any) {
  return (
    <View style={styles2.card}>
       <Image source={{ uri: hit.backdrop_path }} style={styles2.image} />
       <View style={styles2.textContainer}>
          <Text style={styles2.title}>{hit.original_title}</Text>
          <Text style={styles2.overview}>{hit.overview}</Text>
          <Text style={styles2.releaseDate}>{hit.release_date}</Text>
       </View>
       
    </View>
  );
}

const styles2 = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,  
    shadowColor: '#000',  
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,  
    marginVertical: 10,  
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,  
    marginBottom: 10,
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontSize: 20,  
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',  
  },
  overview: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',  
  },
  releaseDate: {
    fontSize: 12,
    color: '#888',
  },
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#252b33",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  hitsContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
