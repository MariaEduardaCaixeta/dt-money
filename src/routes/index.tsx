import { NavigationContainer } from '@react-navigation/native'
import { PublicRoutes } from './PublicRoutes'
import { useCallback, useState } from 'react'
import { PrivateRoutes } from './PrivateRoutes';
import { StatusBar } from 'expo-status-bar';

const NavigationRoutes = () => {
    const [user, setUser] = useState(undefined)

    const Routes = useCallback(() => {
        if (user) {
            return <PrivateRoutes />
        }

        return <PublicRoutes />
    }, [user])

    return (
        <NavigationContainer>
            <StatusBar style="light"/>
            <Routes />
        </NavigationContainer>
    )
}  

export default NavigationRoutes;