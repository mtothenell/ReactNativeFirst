import "./styles.css";
import Index from "./components";
import React, {useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Topboard from "./components/Topboard";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import Tournament from "./components/Tournament";
import {TournamentDataProvider, useTournamentData} from "./components/TournamentDataContext";
import {useFonts} from "expo-font";
import * as Font from 'expo-font';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (

    <Stack.Navigator screenOptions={{
        headerTitleStyle: {
            alignSelf: 'flex-end',
            fontFamily: "Bauhaus_93",
        },
        headerStyle: {
            backgroundColor: "orange",
        }
    }}>
        <Stack.Screen name="Home" component={Index} options={{headerShown: false}}/>
        <Stack.Screen name="Tournament" component={Tournament} options={{headerShown: false}}/>
        {/*<Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>*/}
        <Stack.Screen name="Topboard" component={Topboard} options={{headerShown: false}}/>
    </Stack.Navigator>
);

export default function App() {

    const [isFontLoaded, setIsFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Bauhaus_93: require('./assets/fonts/bauhaus_93.ttf'),
            });
            setIsFontLoaded(true);
        }
        loadFonts().then(r => () => {});
    }, []);

    // Wait for fonts to load before rendering the app
    if (!isFontLoaded) {
        return null; // You can return a loading indicator here
    }

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
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: {fontSize: 14, fontFamily: "Bauhaus_93", color: "black"},
                        tabBarStyle: {},
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={Index}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                            tabBarIcon: ({color, size, focused}) => (
                                <Ionicons name="home" size={size} color={focused ? 'orange' : 'green'}/>
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
                                tabBarIcon: ({color, size, focused}) => (
                                    <Ionicons name="home" size={size} color={focused ? 'orange' : 'green'}/>
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
                                tabBarIcon: ({color, size, focused}) => (
                                    <Ionicons name="home" size={size} color={focused ? 'orange' : 'green'}/>
                                ),
                            }}
                        />
                    }
                </Tab.Navigator>
            </NavigationContainer>
        </TournamentDataProvider>
    );
}


