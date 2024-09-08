import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CatalogScreen from './screens/CatalogScreen';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';
import { AuthContext, AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import BookDetailsScreen from './screens/BookDetailScreen';
import TakenBooksScreen from './screens/TakenBookScreen';
import NewsScreen from './screens/NewsScreen';
import GamesScreen from './screens/GamesScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Главная') {
            iconName = 'home-outline';
          } else if (route.name === 'Каталог') {
            iconName = 'book-outline';
          } else if (route.name === 'Профиль') {
            iconName = 'person-outline';
          } else if (route.name === 'Мои книги') {
            iconName = 'bookmarks-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name="Главная" component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Каталог" component={CatalogScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Профиль" component={ProfileScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Мои книги" component={TakenBooksScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="App" component={AppNavigator} /> 
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default MainApp;