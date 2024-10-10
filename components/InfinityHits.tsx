import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useInfiniteHits } from 'react-instantsearch-core';

const InfinityHits = ({ hitComponent: Hit, ...props}: { hitComponent: React.ComponentType<any> }) => {
    const { items, isLastPage, showMore } = useInfiniteHits({
        ...props,
        escapeHTML: false,
      });

      const [isLoadingMore, SetIsLoadingMore] = useState(false)
    
      return (
        <View style={styles.container}>
          <FlatList
          data={items}
          keyExtractor={(item) => item.objectID}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!isLastPage) {
              showMore();
            }
          }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Hit hit={item} />
            </View>
          )}
          ListFooterComponent={
            !isLoadingMore && isLastPage ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#4A90E2"/>
              </View>
            ) : null
          }
          contentContainerStyle={styles.contentContainer}
        />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  separator: {
    height: 16, 
  },
  item: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4,
    elevation: 2, 
    marginHorizontal: 16,
    marginBottom: 8, 
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  loader: {
    padding: 20,
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

export default InfinityHits