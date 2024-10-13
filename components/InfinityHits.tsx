import React, { useState, forwardRef, ForwardedRef} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useInfiniteHits } from 'react-instantsearch-core';

interface InfinityHitsProps {
  hitComponent: React.ComponentType<any>;
  onSelect: (objectID: string) => void;
}


const InfinityHits = forwardRef<FlatList<any>, InfinityHitsProps>(({ hitComponent: Hit, onSelect, ...props }, ref: ForwardedRef<FlatList<any>>) => {
  const { items, isLastPage, showMore } = useInfiniteHits({
    ...props,
    escapeHTML: false,
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
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
            <Hit hit={item} onSelect={onSelect}/>
          </View>
        )}
        ListFooterComponent={
          !isLoadingMore && isLastPage ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#4A90E2" />
            </View>
          ) : null
        }
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

export default InfinityHits;
