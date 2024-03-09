import React from 'react';
import { View, Image } from 'react-native';

import mangopadel from "../assets/mangpadel2.png"
import commonStyles from "../commonStyles";

const HeaderComponent = () => {
    return (
            <View style={{paddingTop: 20}}>
                <Image style={{marginLeft: 50}} source={mangopadel}></Image>
            </View>
    );
};

export default HeaderComponent;
