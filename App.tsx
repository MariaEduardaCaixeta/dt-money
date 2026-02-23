import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./src/shared/styles/global.css";
import { Login } from './src/screens/Login';
import NavigationRoutes from '@/routes';
import { AuthContextProvider } from '@/context/auth.context';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}