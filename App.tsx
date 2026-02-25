import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./src/shared/styles/global.css";
import { Login } from './src/screens/Login';
import NavigationRoutes from '@/routes';
import { AuthContextProvider } from '@/context/auth.context';
import { SnackbarContextProvider } from '@/context/snackbar.context';
import { Snackbar } from '@/components/Snackbar';
import { BottomSheetProvider } from '@/context/bottomSheet.context';

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <BottomSheetProvider>
          <NavigationRoutes />
          <Snackbar />
        </BottomSheetProvider>
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}