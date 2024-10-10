import { liteClient as algoliasearch } from "algoliasearch/lite";
import {  InstantSearch } from "react-instantsearch-core";
import { View, StyleSheet } from "react-native";
import { Hit } from "./Hit";

const searchClient = algoliasearch("YNZK52PRU0", "441fe7e3eb93f5cbfd485f2aff8ae473");

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="movie">
      
      <View style={styles.searchContainer}>
        
        
      </View>
    </InstantSearch>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 20,
  },
});