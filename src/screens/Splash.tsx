import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../context'

//CONSTANT & ASSETS
import { IMAGES } from '../assets'
import { getScaleSize, Storage } from '../constant'

//SCREENS
import { SCREENS } from '.'
import { CommonActions } from '@react-navigation/native'


export default function Splash(props: any) {

    const { theme } = useContext(ThemeContext)
    const { setUser, setUserType } = useContext<any>(AuthContext);

    useEffect(() => {
        checkUserDetails()
    }, [])

    async function checkUserDetails() {
        const userDetails = await Storage.get(Storage.USER_DETAILS);
        const userData = JSON.parse(userDetails ?? '{}');
        console.log('userData', userData)
        if (userData && userData?.user_data?.role) {
            setUser(userData);
            setUserType(userData?.user_data?.role);
            setTimeout(() => {
                props?.navigation?.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: SCREENS.BottomBar.identifier }],
                    }),
                );
            }, 1000)
        } else {
            setTimeout(() => {
                props?.navigation?.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: SCREENS.Login.identifier }],
                    }),
                );
            }, 2000)
        }
    };

    return (
        <View style={styles(theme).container}>
            <SafeAreaView />
            <View style={styles(theme).statusBar}>
                <StatusBar
                    translucent={false}
                    backgroundColor={theme.primary}
                    barStyle={'light-content'} />
            </View>
            <Image source={IMAGES.ic_logo} style={styles(theme).logo} />
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.primary
    },
    logo: {
        width: Dimensions.get('window').width - getScaleSize(116),
        height: Dimensions.get('window').width - getScaleSize(116),
    },
    statusBar: {
        // height: StatusBar.currentHeight
    }
})