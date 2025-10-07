import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context'

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets'
import { getScaleSize } from '../../constant'

//SCREENS
import { SCREENS } from '..'

//COMPONENTS
import { Header, Input, Text, Button } from '../../components'



export default function Login(props: any) {

    const { theme } = useContext<any>(ThemeContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(true)
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')

    async function onLogin() {
        if (!email) {
            setEmailError('Please enter your email')
        } else if (!password) {
            setPasswordError('Please enter your password')
        } else {
            setEmailError('')
            setPasswordError('')
            console.log('Login')
        }
    }

    return (
        <View style={styles(theme).container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Image source={IMAGES.ic_logo} style={styles(theme).logo} />
                    <Text
                        size={getScaleSize(27)}
                        font={FONTS.Lato.ExtraBold}
                        color={theme._2C6587}
                        align="center"
                        style={{ marginBottom: getScaleSize(12) }}>
                        {'Welcome Back!'}
                    </Text>
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._565656}
                        align="center"
                        style={{ marginBottom: getScaleSize(36) }}>
                        {'Enter your email and password to login'}
                    </Text>
                    <View style={styles(theme).inputContainer}>
                        <Text
                            size={getScaleSize(17)}
                            font={FONTS.Lato.SemiBold}
                            color={theme.primary}
                            style={{ marginBottom: getScaleSize(8) }}>
                            {'Email/ Mobile No'}
                        </Text>
                        <Input
                            placeholder="Enter Email/ Mobile No"
                            placeholderTextColor={theme._939393}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(text) => {
                                setEmail(text)
                                setEmailError('')
                            }}
                            isError={emailError}
                        />
                    </View>
                    <View style={styles(theme).inputContainer}>
                        <Text
                            size={getScaleSize(17)}
                            font={FONTS.Lato.SemiBold}
                            color={theme.primary}
                            style={{ marginBottom: getScaleSize(8) }}>
                            {'Password'}
                        </Text>
                        <Input
                            placeholder="Enter Password"
                            placeholderTextColor={theme._939393}
                            value={password}
                            passwordIcon={true}
                            secureTextEntry={show}
                            onChnageIcon={() => {
                                setShow(!show);
                            }}
                            onChangeText={(text) => {
                                setPassword(text)
                                setPasswordError('')
                            }}
                            isError={passwordError}
                        />
                    </View>
                    <Button
                        title="Log In"
                        style={{ marginTop: getScaleSize(8), marginBottom: getScaleSize(24) }}
                        onPress={() => {
                            onLogin()
                        }}
                    />
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.Regular}
                        color={theme._999999}
                        align="center"
                        style={{ marginTop: getScaleSize(12) }}>
                        {'Don’t have an account? '}
                        <Text
                            size={getScaleSize(20)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._2C6587}
                            onPress={() => {

                            }}>
                            {'Sign up'}
                        </Text>
                    </Text>
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.Regular}
                        onPress={() => {
                           
                        }}
                        color={theme._999999}
                        align="center"
                        style={{ marginTop: getScaleSize(24) }}>
                        {'Forgot password ?'}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: theme.white
    },
    mainContainer: {
        flex: 1.0,
        marginHorizontal: getScaleSize(24),
        marginVertical: getScaleSize(24)
    },
    logo: {
        width: Dimensions.get('window').width - getScaleSize(240),
        height: Dimensions.get('window').width - getScaleSize(240),
        alignSelf: 'center',
        marginBottom: getScaleSize(31)
    },
    inputContainer: {
        marginBottom: getScaleSize(16)
    }
})