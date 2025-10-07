import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../context'

//CONSTANT & ASSETS
import { IMAGES } from '../assets'
import { getScaleSize } from '../constant'

//SCREENS
import { SCREENS } from '.'


export default function Splash(props: any) {

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        setTimeout(() => {
            props?.navigation?.navigate(SCREENS.Login.identifier)
        }, 2000)
    }, [])

    return (
        <View style={styles(theme).container}>
            <SafeAreaView />
            <View style={styles(theme).statusBar}>
                <StatusBar
                    translucent={true}
                    backgroundColor={'transparent'}
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