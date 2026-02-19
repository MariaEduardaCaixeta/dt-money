import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./src/shared/styles/global.css";
import { Login } from './src/screens/Login';

export default function App() {
  return (
    <Login />
  );
}