import React, { useRef, useState } from "react";
import { InstantSearch, useLookingSimilar } from "react-instantsearch-core";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
} from "react-native";

import InfinityHits from "@/components/InfinityHits";
import SearchBox from "@/components/SearchBox";
import { Filters } from "@/components/Filters";
import CustomLookingSimilar from "@/components/Recommendations";

// Initialize Algolia search client
const searchClient = algoliasearch('YNZK52PRU0', '441fe7e3eb93f5cbfd485f2aff8ae473')


export default function Index() {
  const listRef = useRef<FlatList>(null)

  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedObjectID, setSelectedObjectID] = useState<string>('');

  function scrollToTop() {
    listRef.current?.scrollToOffset({animated: false, offset: 0 })
  }

  function handleBack() {
    setSelectedObjectID('')
  }
  
  return (
    <SafeAreaView style={styles.safe} >
      <StatusBar barStyle="light-content"/>
      <View style={styles.container} >
        {/* Set up InstantSearch with Algolia client and index */}
        <InstantSearch 
         searchClient={searchClient}
         indexName="movie"
         >
          <SearchBox onChange={scrollToTop}/>
          <Filters 
            isModalOpen={isModalOpen}
            onToggleModal={() => setModalOpen((isOpen) => !isOpen)}
            onChange={scrollToTop}
          />
          <InfinityHits ref={listRef} hitComponent={Hit} onSelect={setSelectedObjectID}/>
          {
            selectedObjectID && (
              <CustomLookingSimilar objectID={selectedObjectID} onBack={handleBack}/>
            )
          }
        </InstantSearch>
      </View>
    </SafeAreaView>
  )
}

// Component to render individual search result
function Hit({ hit, onSelect }: any) {
  return (
    <View style={styles2.card}>
       <Image source={{ uri: hit.backdrop_path }} style={styles2.image} />
       <View style={styles2.textContainer}>
          <Text style={styles2.title}>{hit.original_title}</Text>
          <Text style={styles2.overview}>{hit.overview}</Text>
          <Text style={styles2.releaseDate}>{hit.release_date}</Text>
          <Button title="Recommendations" onPress={() => onSelect(hit.objectID)} />
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
    marginBottom: 10
  },
});

// Styles for the main container
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
