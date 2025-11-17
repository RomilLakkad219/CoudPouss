import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useRef } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { getScaleSize, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

//COMPONENTS
import { BottomSheet, Header, StatusItem, Text, UploadDocumentsSheet } from '../../components';
import { SCREENS } from '..';


export default function ApplicationStatus(props: any) {
    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const bottomSheetRef = useRef<any>(null);
    const successBottomSheetRef = useRef<any>(null);

    const statusData = [
        {
            id: 1,
            title: "Subscribed",
            date: "Subscription confirmed.",
            completed: true,
        },
        {
            id: 2,
            title: 'Documents Uploaded',
            date: "Documents submitted.",
            completed: true,
        },
        {
            id: 3,
            title: 'Rejected',
            date: "Some documents are currently missing. Please upload the required documents within the next 15 days to avoid account deletion and a €30 fee charged to your registered card.",
            isRejected: true,
        },

    ];

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.application_status}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles(theme).scrolledContainer}>
                <Text
                    size={getScaleSize(18)}
                    font={FONTS.Lato.Medium}
                    color={theme._737373}>
                    {STRING.unfortunately_your_application_could_not_be_approved_due_to_missing_or_invalid_documents}
                </Text>
                <View style={styles(theme).statusContainer}>
                    {statusData.map((item, index) => (
                        <StatusItem
                            key={item.id}
                            item={item}
                            index={index}
                            isLast={index === statusData.length - 1}
                        />
                    ))}
                    <TouchableOpacity
                        onPress={() => {
                            bottomSheetRef.current?.open();
                        }}
                        style={styles(theme).uploadDocumentsButton}>
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.SemiBold}
                            align="center"
                            color={theme.white}>
                            {STRING.upload_documents}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <UploadDocumentsSheet
                bottomSheetRef={bottomSheetRef}
                height={470}
                buttonTitle={STRING.upload}
                onPressButton={() => {
                    successBottomSheetRef.current?.open();
                    bottomSheetRef.current?.close();
                 }}
            />
            <BottomSheet
                bottomSheetRef={successBottomSheetRef}
                height={300}
                isStatus={true}
                title={STRING.documents_uploaded_successfully_your_documents_will_be_reviewed_within_72_hours}
                buttonTitle={STRING.proceed}
                onPressButton={() => {
                    successBottomSheetRef.current?.close();
                    props.navigation.goBack();
                 }}
            />
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.white },
        scrolledContainer: {
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(24),
        },
        statusContainer: {
            marginTop: getScaleSize(24),
            borderWidth: 1,
            borderColor: theme._E6E6E6,
            borderRadius: getScaleSize(12),
            padding: getScaleSize(24),
        },
        uploadDocumentsButton: {
            backgroundColor: theme._214C65,
            borderRadius: getScaleSize(8),
            padding: getScaleSize(12),
            alignSelf: 'flex-end',
        }
    })