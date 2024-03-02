import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "components";
import TopboardScreen from "components/Topboard";
import SettingsScreen from "components/Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const TopboardStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Topboard" component={TopboardScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const SettingsStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const OoApp = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={TopboardStack} />
                <Tab.Screen name="Topboard" component={TopboardStack} />
                <Tab.Screen name="Settings" component={SettingsStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default OoApp;
