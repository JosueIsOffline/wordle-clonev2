import React, { useRef, useState } from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-core';

interface SearchBoxProps extends UseSearchBoxProps {
  onChange: (value: string) => void;
}

const SearchBox = ({ onChange, ...props}: SearchBoxProps) => {
    // Use the useSearchBox hook to handle search logic
    const { query, refine } = useSearchBox(props);
    const [inputValue, setInputValue] = useState(query);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
  
    // Update local state and refine search when query changes
    function setQuery(newQuery: string) {
      setInputValue(newQuery);
      refine(newQuery);
    }
  
    // Track when the InstantSearch query changes to synchronize it with
    // the React state.
    // We bypass the state update if the input is focused to avoid concurrent
    // updates when typing.

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
  
    // Synchronize local state with InstantSearch query
    if (query !== inputValue && !isFocused) {
      setInputValue(query);
    }
  
    return (
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={[styles.input, isFocused && styles.inputFocused]}
          value={inputValue}
          onChangeText={setQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder='Search for movies...'
          placeholderTextColor="#aaa"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          autoComplete="off"
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 25,
    borderRadius: 30,
    margin: 10,
    ...Platform.select({
      web: {
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  input: {
    height: 48,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderRadius: 25, 
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  inputFocused: {
    borderColor: '#4A90E2', 
    shadowOpacity: 0.2, 
  },
});

export default SearchBox