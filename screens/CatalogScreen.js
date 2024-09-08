import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';


const CatalogScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://thankful-moose-gratefully.ngrok-free.app/books/');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to load books');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image
        source={{ uri: `https://thankful-moose-gratefully.ngrok-free.app/media/covers/test_TC8boAB.png` }}
        style={styles.cover}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={styles.info}>{`Release Date: ${item.release_date}`}</Text>
        <Text style={styles.info}>{`Origin: ${item.origin}`}</Text>
        <Text style={styles.info}>{`Genre: ${item.genre}`}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>

    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    elevation: 1,
  },
  cover: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  info: {
    fontSize: 12,
    color: '#777',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default CatalogScreen;