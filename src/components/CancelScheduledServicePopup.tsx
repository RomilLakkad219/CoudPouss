import React, { useContext, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import { ThemeContext, ThemeContextType } from '../context';
import { getScaleSize, useString } from '../constant';
import { FONTS, IMAGES } from '../assets';
import Text from './Text';
import { constant } from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';

const CancelScheduledServicePopup = (props: any) => {
    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    const [selectedCategory, setSelectedCategory] = useState(1);

    const startOpenAnimations = () => {
        fadeAnim.setValue(0);
        slideAnim.setValue(100); // Start from further down for slower feel
        scaleAnim.setValue(0.7); // Start smaller for more dramatic scale

        // Ultra slow and smooth animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200, // 1.2 seconds
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1200,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1200,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const startCloseAnimations = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 50,
                duration: 300,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 300,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <RBSheet
                ref={props.onRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                animationType="slide"
                onOpen={startOpenAnimations}
                onClose={startCloseAnimations}
                customStyles={{
                    container: {
                        backgroundColor: '#FFF',
                        height: getScaleSize(550),
                        borderTopLeftRadius: getScaleSize(20),
                        borderTopRightRadius: getScaleSize(20),
                    },
                }}>
                <View style={styles(theme).content}>
                    <Image style={styles(theme).icon} source={IMAGES.serviceCancelledIcon} />
                    <Text
                        size={getScaleSize(22)}
                        font={FONTS.Lato.Bold}
                        color={theme.primary}
                        style={{ alignSelf: 'center', marginTop: getScaleSize(16) }}>
                        {STRING.cancel_scheduled_service}
                    </Text>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Medium}
                        color={theme._424242}
                        align="center"
                        style={{
                            alignSelf: 'center',
                            marginTop: getScaleSize(16),
                            marginHorizontal: getScaleSize(50),
                        }}>
                        {STRING.are_you_sure_you_want_to_cancel_your_scheduled_service_with_the_expert}
                    </Text>
                    <View style={styles(theme).informationContainer}>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._323232}
                            style={{ marginBottom: getScaleSize(8) }}>
                            {STRING.payment_breakdown}
                        </Text>
                        <View style={styles(theme).horizontalView}>
                            <Text
                                style={{ flex: 1.0 }}
                                size={getScaleSize(14)}
                                font={FONTS.Lato.SemiBold}
                                color={'#595959'}>
                                {STRING.FinalizedQuoteAmount}
                            </Text>
                            <Text
                                size={getScaleSize(14)}
                                font={FONTS.Lato.SemiBold}
                                color={'#595959'}>
                                {'€499'}
                            </Text>
                        </View>
                        <View style={styles(theme).horizontalView}>
                            <Text
                                style={{ flex: 1.0 }}
                                size={getScaleSize(14)}
                                font={FONTS.Lato.SemiBold}
                                color={'#595959'}>
                                {STRING.service_fee}
                            </Text>
                            <Text

                                size={getScaleSize(14)}
                                font={FONTS.Lato.SemiBold}
                                color={'#595959'}>
                                {'€49.00'}
                            </Text>
                        </View>
                        <View style={styles(theme).dotView} />
                        <View style={styles(theme).horizontalView}>
                            <Text
                                style={{ flex: 1.0 }}
                                size={getScaleSize(20)}
                                font={FONTS.Lato.SemiBold}
                                color={'#0F232F'}>
                                {STRING.Total}
                                <Text
                                    size={getScaleSize(11)}
                                    font={FONTS.Lato.Regular}
                                    color={theme._424242}>
                                    {'  (final amount you will get)'}
                                </Text>
                            </Text>
                            <Text
                                size={getScaleSize(20)}
                                font={FONTS.Lato.SemiBold}
                                color={theme.primary}>
                                {'€450.00'}
                            </Text>
                        </View>
                    </View>
                    {/* <View style={{flex:1.0}}/> */}
                    <View style={styles(theme).buttonContainer}>
                        <TouchableOpacity
                            style={styles(theme).nextButtonContainer}
                            activeOpacity={1}
                            onPress={() => {
                                props?.proceedToPay()
                            }}>
                            <Text
                                size={getScaleSize(19)}
                                font={FONTS.Lato.Bold}
                                color={theme.white}
                                style={{ alignSelf: 'center' }}>
                                {STRING.keep_booking}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles(theme).backButtonContainer}
                            activeOpacity={1}
                            onPress={() => {
                                props?.onClose()
                            }}>
                            <Text
                                size={getScaleSize(19)}
                                font={FONTS.Lato.Bold}
                                color={theme._C62828}
                                style={{ alignSelf: 'center' }}>
                                {STRING.confirm_cancellation}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </View>
    );
};

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flexDirection: 'column',
            marginTop: getScaleSize(24),
        },
        content: {
            paddingVertical: getScaleSize(24),
        },
        icon: {
            height: getScaleSize(60),
            width: getScaleSize(60),
            alignSelf: 'center',
        },
        radioButtonContainer: {
            marginTop: getScaleSize(20),
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: theme._D5D5D5,
            paddingVertical: getScaleSize(17),
            paddingHorizontal: getScaleSize(17),
            borderRadius: getScaleSize(12),
            marginHorizontal: getScaleSize(22),
        },
        radioButton: {
            height: getScaleSize(24),
            width: getScaleSize(24),
            alignSelf: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            marginHorizontal: getScaleSize(22),
            marginTop: getScaleSize(24),
        },
        backButtonContainer: {
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme._C62828,
            borderRadius: getScaleSize(12),
            paddingVertical: getScaleSize(18),
            backgroundColor: theme.white,
            marginLeft: getScaleSize(8),
            paddingHorizontal: getScaleSize(22),
        },
        nextButtonContainer: {
            flex: 1.0,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.primary,
            borderRadius: getScaleSize(12),
            paddingVertical: getScaleSize(18),
            backgroundColor: theme.primary,
            marginRight: getScaleSize(8),
        },
        informationContainer: {
            marginTop: getScaleSize(16),
            borderWidth: 1,
            borderColor: '#D5D5D5',
            borderRadius: getScaleSize(16),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(28),
            marginHorizontal: getScaleSize(24),
        },
        horizontalView: {
            flexDirection: 'row',
            marginTop: getScaleSize(8),
        },
        dotView: {
            // flex:1.0,
            borderStyle: 'dashed',
            borderColor: theme.primary,
            borderWidth: 1,
            marginTop: getScaleSize(16),
            marginBottom: getScaleSize(8),
        }
    });

export default CancelScheduledServicePopup;
