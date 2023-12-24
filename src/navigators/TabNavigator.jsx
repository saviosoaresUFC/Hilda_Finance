import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Venda from '../screens/Venda'
import { BlurView } from 'expo-blur'
import Despesa from '../screens/Despesa'
import Relatorio from '../screens/Relatorio'


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                // tabBarBackground: () => (
                //     <BlurView tint='light' intensity={16} style={StyleSheet.absoluteFill} />
                // ),
            }}>
            <Tab.Screen
                name="Venda"
                component={Venda}
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../../img/acquisition.png')} style={styles.imgIcon} />
                    ),
                }}
            />
            
            <Tab.Screen
                name="Despesa"
                component={Despesa}
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../../img/cart.png')} style={styles.imgIcon} />
                    ),
                }}
            />

            <Tab.Screen
                name="Relaroio"
                component={Relatorio}
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../../img/report.png')} style={styles.imgIcon} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        flex: 1,
        position: 'absolute',
        height: '8%',
        width: '78%',
        marginLeft: '11%',
        marginBottom: '5%',
        borderTopColor: 'transparent',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: '#FF6B00'
    },
    imgIcon: {
        width: 46,
        height: 46,
    }
})

export default TabNavigator