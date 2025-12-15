import { Dimensions, FlatList, Image, ScrollView, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST, CATEGORY_DATA, SERVICES_DATA } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button, CategoryDropdown, ServiceItem } from '../../components';
import { API } from '../../api';


export default function ReviewServices(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);
    const { selectedServices, setSelectedServices, myPlan } = useContext<any>(AuthContext);

    const [isLoading, setLoading] = useState(false);

    const onDeleteService = (service: any) => {
        const updated = selectedServices
            .map((section: any) => ({
                ...section,
                service: section?.service?.filter((s: any) => s?.id !== service?.id)
            }))
            .filter((section: any) => section?.service?.length > 0);

        setSelectedServices(updated);
    };

    console.log('selectedServices==>', selectedServices)

    async function onSelectedCategories() {
        const categoryIds = selectedServices.map((item: any) => item.category?.id);
        const params = {
            category_ids: categoryIds
        }
        try {
            setLoading(true);
            const result = await API.Instance.post(API.API_ROUTES.onSelectedCategories, params);
            console.log('result', result.status, result)
            if (result.status) {
                console.log('result?.data?.data?', result?.data?.data)
                onSelectedServices()
            } else {
                SHOW_TOAST(result?.data?.message, 'error')
                console.log('ERR', result?.data?.message)
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
            console.log(error?.message)
        } finally {
            setLoading(false);
        }
    }

    async function onSelectedServices() {
        const serviceIds: any = [];
        selectedServices.forEach((item: any) => {
            item.service?.forEach((e: any) => {
                serviceIds.push(e.id);
            });
        });
        const params = {
            sub_category_ids: serviceIds
        }
        try {
            setLoading(true);
            const result = await API.Instance.post(API.API_ROUTES.onSelectedServices, params);
            console.log('result', result.status, result)
            if (result.status) {
                console.log('result?.data?.data?', result?.data?.data)
                setSelectedServices([]);
                if (myPlan === 'professional') {
                    props.navigation.navigate(SCREENS.AddBankDetails.identifier);
                } else {
                    props.navigation.navigate(SCREENS.AccountCreatedSuccessfully.identifier);
                }
            } else {
                SHOW_TOAST(result?.data?.message, 'error')
                console.log('ERR', result?.data?.message)
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
            console.log(error?.message)
        } finally {
            setLoading(false);
        }
    }

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
                        {selectedServices.map((section: any, index: number) => {
                            return (
                                <View key={index} style={styles(theme).itemContainer}>
                                    <View style={styles(theme).sectionHeaderContainer}>
                                        <Image source={section.icon} style={styles(theme).sectionHeaderIcon} />
                                        <Text size={getScaleSize(16)}
                                            font={FONTS.Lato.SemiBold}
                                            color={theme._2C6587}>
                                            {section?.category?.name ?? ''}
                                        </Text>
                                    </View>
                                    {(section?.service ?? []).map((item: any, index: number) => {
                                        return (
                                            <ServiceItem
                                                key={index}
                                                item={item}
                                                itemContainer={{ marginBottom: getScaleSize(20) }}
                                                isReview={true}
                                                onPress={() => {
                                                    onDeleteService(item);
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
                        onSelectedCategories();
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



