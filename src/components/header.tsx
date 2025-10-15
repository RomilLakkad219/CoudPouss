import { Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../context'

//CONSTANTS & ASSETS
import { getScaleSize } from '../constant'
import { FONTS, IMAGES } from '../assets'

//COMPONENTS
import Text from './Text'

interface HeaderProps {
    onBack?: () => void
    screenName?: string,
}

const Header = (props: HeaderProps) => {

    const { theme } = useContext(ThemeContext)
    return (
        <View>
            <SafeAreaView />
            <View style={styles(theme).statusBar}>
                <StatusBar
                    translucent={false}
                    backgroundColor={'transparent'}
                    barStyle={'dark-content'} />
            </View>
            <View style={[styles(theme).container, { zIndex: 99999 }]}>
                <View style={styles(theme).mainContainer}>
                    {props.onBack &&
                        <TouchableOpacity onPress={props.onBack}>
                            <Image source={IMAGES.ic_back} style={styles(theme).backIcon} />
                        </TouchableOpacity>
                    }
                    {props.screenName &&
                        <TouchableOpacity onPress={props.onBack}>
                            <Text
                                size={getScaleSize(20)}
                                font={FONTS.Lato.SemiBold}
                                color={theme._323232}
                                style={{ textTransform: 'capitalize' }}>
                                {props.screenName}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        paddingHorizontal: getScaleSize(24),
        paddingVertical: getScaleSize(8),
        // alignSelf:'center'
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusBar: {
        height: StatusBar.currentHeight
    },
    backIcon: {
        width: getScaleSize(40),
        height: getScaleSize(40),
        marginRight: getScaleSize(16)
    }
})