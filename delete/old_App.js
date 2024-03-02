import "../styles.css";
import Index from "../components";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Topboard from "../components/Topboard";
import Settings from "../components/Settings";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    alignSelf: 'flex-end',
                    fontFamily: "notoserif",
                },
                headerStyle: {
                    backgroundColor: "orange",
                }
            }}>
                <Stack.Screen name="Home" component={Index} options={{headerShown: false }}/>
                <Stack.Screen name="Topboard" component={Topboard} options={{headerShown: false }}/>
                <Stack.Screen name="Settings" component={Settings} options={{headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


