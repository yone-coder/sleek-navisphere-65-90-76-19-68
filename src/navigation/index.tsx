
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Gamepad2, Trophy, User, Wallet as WalletIcon, ShoppingCart } from 'lucide-react';

// Import your screens
import Apps from '../pages/Apps';
import Login from '../pages/Login';
import Tournaments from '../pages/Tournaments';
import Profile from '../pages/Profile';
import WalletScreen from '../pages/Wallet';
import Marketplace from '../pages/Marketplace';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator
      id="bottom-tabs"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eaeaea',
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tab.Screen
        name="Apps"
        component={Apps}
        options={{
          tabBarIcon: ({ color, size }) => <Gamepad2 color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tournaments"
        component={Tournaments}
        options={{
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ color, size }) => <WalletIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={Marketplace}
        options={{
          tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Main navigator
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        id="main-stack"
        initialRouteName="Main"
      >
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
