import { NavigationContainer } from '@react-navigation/native'
import { PublicRoutes } from './PublicRoutes'
import { useCallback, useState } from 'react'
import { PrivateRoutes } from './PrivateRoutes';
import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from '@/context/auth.context';

const NavigationRoutes = () => {
    const { user, token } = useAuthContext();

    const Routes = useCallback(() => {
        if (user || token) {
            return <PrivateRoutes />
        }

        return <PublicRoutes />
    }, [user, token])

    return (
        <NavigationContainer>
            <StatusBar style="light"/>
            <Routes />
        </NavigationContainer>
    )
}  

export default NavigationRoutes;