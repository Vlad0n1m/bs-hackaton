import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have this import
import Layout from '../components/Layout';
import QRID from '../components/QRID';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import ButtonGrid from '../components/ButtonGrid';

const HomeScreen = ({ navigation }) => {
    const handleButtonPress = (buttonName) => {
        if (buttonName === 'Active Books') {
            // Handle navigation or actions for Active Books
            navigation.navigate('Мои книги');

        } else if (buttonName === 'Catalog') {
            navigation.navigate('Catalog');
        } else if (buttonName === 'News') {
            // Handle navigation or actions for News
      navigation.navigate('News');

        } else if (buttonName === 'Games') {
            // Handle navigation or actions for Games
            navigation.navigate('Games');

        }
    };
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { accessToken } = useContext(AuthContext); // If you're storing it in context

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // Step 1: Log the token from AsyncStorage
                const token = await AsyncStorage.getItem('access');
                console.log('Access token from AsyncStorage:', token);

                if (token) {
                    // Step 2: Make sure the request is formatted correctly
                    const response = await axios.get('https://thankful-moose-gratefully.ngrok-free.app/users/profile/', {
                        headers: {
                            Authorization: `Bearer ${token}`, // Use Bearer token
                        },
                    });
                    console.log('User info response:', response.data);
                    setUserInfo(response.data); // Save user info from the API response
                } else {
                    console.log('No access token found');
                    Alert.alert('Error', 'No access token found');
                }
            } catch (error) {
                // Step 3: Log the error to identify any issues
                console.error('Error fetching user info:', error);
                Alert.alert('Error', 'Failed to fetch user info.');
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchUserInfo(); // Trigger the fetch
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Layout nickname={userInfo['username']}>
            <View style={tw`flex-1`}>
                {/* <Text style={tw`text-2xl mb-4 text-black`}>Главный экран</Text>
          <Button title="Каталог книг" onPress={() => navigation.navigate('Catalog')} /> */}
                <QRID />
                <View style={tw`flex-1 bg-white`}>
                    <ButtonGrid onButtonPress={handleButtonPress} />
                </View>
            </View>
        </Layout>
    );
};

export default HomeScreen;


