import { Dimensions, FlatList, Image, ScrollView, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST, CATEGORY_DATA, SERVICES_DATA } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button, CategoryDropdown, ServiceItem } from '../../components';


export default function ReviewServices(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);

    const SECTIONS_DATA = [
        {
            title: 'DIY',
            icon: IMAGES.ic_hammer_wrench,
            data: [
                {
                    id: 1,
                    name: 'Furniture Assembly'
                }, {
                    id: 2,
                    name: 'Interior Painting'
                }
            ]
        },
        {
            title: 'Gardening',
            icon: IMAGES.ic_hammer_wrench,
            data: [
                {
                    id: 1,
                    name: 'Green Waste Removal'
                }
            ]
        },
        {
            title: 'Moving',
            icon: IMAGES.ic_hammer_wrench,
            data: [
                {
                    id: 1,
                    name: 'Moving'
                }
            ]
        },
        {
            title: 'Housekeeping',
            icon: IMAGES.ic_hammer_wrench,
            data: [
                {
                    id: 1,
                    name: 'Housekeeping'
                }
            ]
        }
    ]

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.add_services}
            />
            <View style={styles(theme).mainContainer}>
                <Text size={getScaleSize(24)}
                    font={FONTS.Lato.Bold}
                    color={theme._2C6587}
                    style={{ marginBottom: getScaleSize(12) }}>
                    {STRING.select_a_service}
                </Text>
                <Text size={getScaleSize(16)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._939393}
                    style={{ marginBottom: getScaleSize(24) }}>
                    {STRING.review_your_selected_services_You_can_go_back_to_make_changes_or_continue_to_confirm_your_choices}
                </Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1.0 }}>
                        {SECTIONS_DATA.map((section) => {
                            return (
                                <View style={styles(theme).itemContainer}>
                                    <View style={styles(theme).sectionHeaderContainer}>
                                        <Image source={section.icon} style={styles(theme).sectionHeaderIcon} />
                                        <Text size={getScaleSize(16)}
                                            font={FONTS.Lato.SemiBold}
                                            color={theme._2C6587}>
                                            {section.title}
                                        </Text>
                                    </View>
                                    {section.data.map((item) => {
                                        return (
                                            <ServiceItem
                                                item={item}
                                                itemContainer={{ marginBottom: getScaleSize(20) }}
                                                isReview={true}
                                                onPress={() => {

                                                }}
                                                onDelete={() => {

                                                }}
                                            />
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }} style={styles(theme).backButton}>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Bold}
                        color={theme._214C65}
                        align="center">
                        {STRING.back}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: getScaleSize(16) }} />
                <Button
                    title={STRING.next}
                    style={{ flex: 1.0 }}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.AddBankDetails.identifier);
                    }}
                />
            </View>
        </View >
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1.0,
            backgroundColor: theme.white,
            justifyContent: 'center'
        },
        mainContainer: {
            flex: 1.0,
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(14),
            justifyContent: 'center'
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: getScaleSize(24),
            marginBottom: getScaleSize(24)
        },
        backButton: {
            flex: 1.0,
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            borderColor: theme._214C65,
            paddingVertical: getScaleSize(18),
            alignItems: 'center',
            justifyContent: 'center',
        },
        itemContainer: {
            marginBottom: getScaleSize(24),
            borderWidth: 1,
            borderColor: theme._E6E6E6,
            borderRadius: getScaleSize(12),
            paddingTop: getScaleSize(24),
            paddingHorizontal: getScaleSize(24),
            paddingBottom: getScaleSize(4),
        },
        sectionHeaderContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme._2C6587,
            borderRadius: getScaleSize(10),
            paddingVertical: getScaleSize(10),
            paddingHorizontal: getScaleSize(16),
            marginBottom: getScaleSize(16),
            alignSelf: 'flex-start'
        },
        sectionHeaderIcon: {
            width: getScaleSize(24),
            height: getScaleSize(24),
            marginRight: getScaleSize(14)
        }
    });



