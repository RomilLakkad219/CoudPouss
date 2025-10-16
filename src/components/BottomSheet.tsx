import { Image, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../context/ThemeProvider';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getScaleSize } from '../constant';
import { FONTS, IMAGES } from '../assets';
import Text from './Text';
import Button from './Button';

interface BottomSheetProps {
    bottomSheetRef: any;
    height: number;
    title?: string;
    description?: string;
    buttonTitle?: string;
    onPressButton?: () => void;
}

export default function BottomSheet(props: BottomSheetProps) {
    const { theme } = useContext<any>(ThemeContext);

    const { bottomSheetRef, height, title, description, buttonTitle, onPressButton } = props;
    return (
        <RBSheet
            ref={bottomSheetRef}
            customModalProps={{
                animationType: 'fade',
                statusBarTranslucent: true,
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: theme._77777733,
                },
                container: {
                    height: height,
                    borderTopLeftRadius: getScaleSize(24),
                    borderTopRightRadius: getScaleSize(24),
                    backgroundColor: theme.white,
                },
            }}
            draggable={false}
            closeOnPressMask={true}>
            <View style={styles(theme).container}>
                <View style={styles(theme).mainContainer}>
                    <Image source={IMAGES.ic_alart} style={styles(theme).alartIcon} />
                    <Text
                        style={{ marginBottom: getScaleSize(16) }}
                        size={getScaleSize(22)}
                        font={FONTS.Lato.SemiBold}
                        align="center"
                        color={theme._2C6587}>
                        {title}
                    </Text>
                    <Text
                        size={getScaleSize(12)}
                        font={FONTS.Lato.Regular}
                        align="center"
                        color={theme._555555}>
                        {description}
                    </Text>
                </View>
                <Button
                    title={buttonTitle}
                    style={{ marginVertical: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                    onPress={onPressButton}
                />
            </View>
        </RBSheet>
    )
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1.0,
        },
        mainContainer: {
            marginTop: getScaleSize(24),
            marginHorizontal: getScaleSize(24),
            flex: 1.0,
        },
        alartIcon: {
            width: getScaleSize(60),
            height: getScaleSize(60),
            alignSelf: 'center',
            marginBottom: getScaleSize(24)
        }
    });