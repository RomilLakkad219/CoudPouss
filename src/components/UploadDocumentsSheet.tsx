import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../context/ThemeProvider';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getScaleSize, useString } from '../constant';
import { FONTS, IMAGES } from '../assets';
import Text from './Text';
import Button from './Button';

interface UploadDocumentsSheetProps {
    bottomSheetRef: any;
    height: number;
    title?: string;
    description?: string;
    buttonTitle?: string;
    onPressButton?: () => void;
}

export default function UploadDocumentsSheet(props: UploadDocumentsSheetProps) {
    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

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
                    <Image source={IMAGES.ic_upload_documents} style={styles(theme).alartIcon} />
                    <Text
                        style={{ marginBottom: getScaleSize(24) }}
                        size={getScaleSize(22)}
                        font={FONTS.Lato.SemiBold}
                        align="center"
                        color={theme._2C6587}>
                        {STRING.upload_documents}
                    </Text>
                    <Text
                        size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        color={theme._555555}>
                        {STRING.a_copy_of_ID}
                    </Text>
                    <TouchableOpacity
                        style={[styles(theme).uploadButton]}
                        activeOpacity={1}
                        onPress={() => { }}>
                        <Image
                            style={styles(theme).attachmentIcon}
                            source={IMAGES.upload_attachment}
                        />
                        <Text
                            size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            color={theme._818285}>
                            {STRING.upload_from_device}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        color={theme._555555}>
                        {STRING.kbis_extract}
                    </Text>
                    <TouchableOpacity
                        style={[styles(theme).uploadButton]}
                        activeOpacity={1}
                        onPress={() => { }}>
                        <Image
                            style={styles(theme).attachmentIcon}
                            source={IMAGES.upload_attachment}
                        />
                        <Text
                            size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            color={theme._818285}>
                            {STRING.upload_from_device}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Button
                    title={buttonTitle}
                    style={{ marginTop: getScaleSize(8), marginBottom: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
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
            marginBottom: getScaleSize(12)
        },
        uploadButton: {
            borderWidth: 1,
            borderColor: theme._818285,
            borderStyle: 'dashed',
            borderRadius: getScaleSize(8),
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: getScaleSize(24),
            justifyContent: 'center',
            marginTop: getScaleSize(8),
            marginBottom: getScaleSize(24),

        },
        attachmentIcon: {
            height: getScaleSize(24),
            width: getScaleSize(24),
            marginRight: getScaleSize(8),
        },
    });