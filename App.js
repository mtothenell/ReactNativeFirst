import "./styles.css";
import Index from "./components";
import React, {useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Topboard from "./components/Topboard";
import Settings from "./components/Settings";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import Tournament from "./components/Tournament";
import {TournamentDataProvider, useTournamentData} from "./components/TournamentDataContext";
import {Dimensions} from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (

    <Stack.Navigator screenOptions={{
        headerTitleStyle: {
            alignSelf: 'flex-end',
            fontFamily: "notoserif",
        },
        headerStyle: {
            backgroundColor: "orange",
        }
    }}>
        <Stack.Screen name="Home" component={Index} options={{headerShown: false}}/>
        <Stack.Screen name="Tournament" component={Tournament} options={{headerShown: false}}/>
        <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        <Stack.Screen name="Topboard" component={Topboard} options={{headerShown: false}}/>
    </Stack.Navigator>
);

export default function App() {

    return (
        <TournamentDataProvider>
            <AppContent/>
        </TournamentDataProvider>
    );
}

function AppContent() {

    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;

    return (
        <TournamentDataProvider>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{tabBarLabelStyle: {fontSize: 14, fontFamily: "notoserif"}}}>
                    <Tab.Screen
                        name="Home"
                        component={Index}
                        options={{
                            headerShown: false,
                            tabBarStyle: {backgroundColor: "#f3eddf"},
                            tabBarLabel: 'Home',
                            tabBarIcon: ({color, size}) => (
                                <Ionicons name="home" size={size} color={color}/>
                            ),
                        }}
                    />
                    {tournamentData.tournamentClickable &&
                        <Tab.Screen
                            name="Tournament"
                            component={Tournament}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Tournament',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name="tennisball" size={size} color={color}/>
                                ),
                            }}
                        />
                    }
                    {tournamentData.topboardClickable &&
                        <Tab.Screen
                            name="Topboard"
                            component={Topboard}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Topboard',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name="stats-chart" size={size} color={color}/>
                                ),
                            }}
                        />
                    }
                    {tournamentData.settingsClickable &&
                        <Tab.Screen
                            name="Settings"
                            component={Settings}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Settings',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name="hammer" size={size} color={color}/>
                                ),
                            }}
                        />
                    }
                </Tab.Navigator>
            </NavigationContainer>
        </TournamentDataProvider>
    );
}


