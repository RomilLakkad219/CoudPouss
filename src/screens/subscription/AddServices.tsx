import { Dimensions, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST, CATEGORY_DATA, SERVICES_DATA } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button, CategoryDropdown, ServiceItem, BottomSheet } from '../../components';
import { API } from '../../api';


export default function AddServices(props: any) {

    const STRING = useString();

    const planDetails: any = props?.route?.params?.planDetails ?? {};
    const isFromManageServices: boolean = props?.route?.params?.isFromManageServices ?? false;

    console.log('planDetails==>', planDetails)

    const { setSelectedServices, selectedServices, myPlan } = useContext<any>(AuthContext);
    const { theme } = useContext<any>(ThemeContext);

    const bottomSheetRef = useRef<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [isLoading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [paymentPopup, setPaymentPopup] = useState(false);

    console.log('selectedCategory==>', selectedCategory, selectedServices)
    useEffect(() => {
        getAllCategories();
    }, []);


    async function getAllCategories() {
        try {
            setLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.allCategories);
            setLoading(false);
            console.log('result', result.status, result)
            if (result.status) {
                console.log('allCategories==', result?.data?.data)
                setAllCategories(result?.data?.data);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error')
                console.log('error==>', result?.data?.message)
            }
        } catch (error: any) {
            setLoading(false);
            SHOW_TOAST(error?.message ?? '', 'error');
            console.log(error?.message)
        } finally {
            setLoading(false);
        }
    }

    async function getSubCategoryData(id: string) {
        try {
            setLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.getHomeData + `/${id}`);
            setLoading(false);
            console.log('result', result.status, result)
            if (result.status) {
                console.log('subcategoryList==', result?.data?.data)
                setSubCategoryList(result?.data?.data?.subcategories ?? []);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error')
                console.log('error==>', result?.data?.message)
            }
        } catch (error: any) {
            setLoading(false);
            SHOW_TOAST(error?.message ?? '', 'error');
            console.log(error?.message)
        } finally {
            setLoading(false);
        }
    }


    const isServiceSelected = (item: any) => {
        if (selectedServices && selectedServices.length > 0) {
            const categoryItem = selectedServices.find((e: any) => e?.category?.id === selectedCategory?.id);
            if (categoryItem) {
                return categoryItem?.service?.some((f: any) => f?.id === item?.id);
            }
        }
        return false;
    }

    async function onSelectServices(item: any) {
        const mySelectedPlan = myPlan === 'non_professional'
        if (selectedServices && selectedServices.length > 0) {
            const categoryItem = selectedServices.find((e: any) => e?.category?.id === selectedCategory?.id);

            //---=============== Payment popup logic ================



            //---=============== Payment popup logic End================
            if (categoryItem) {
                const newCategoryItem = { ...categoryItem };

                let services: any[] = newCategoryItem?.service ?? [];
                const serviceItem = services?.find((e: any) => e?.id === item?.id);
                if (serviceItem) {
                    services = services.filter((e: any) => e.id !== item.id);
                }
                else {
                    services = [...services, item];
                }

                newCategoryItem.service = services;

                const categoryItemIndex = selectedServices.findIndex((e: any) => e?.category?.id === selectedCategory?.id);
                if (newCategoryItem.service && newCategoryItem.service.length > 0) {
                    selectedServices.splice(categoryItemIndex, 1, newCategoryItem);
                    setSelectedServices([...selectedServices]);
                }
                else {
                    selectedServices.splice(categoryItemIndex, 1);
                    setSelectedServices([...selectedServices]);
                }
            }
            else {
                const newCategoryItem = {
                    category: selectedCategory,
                    service: [item],
                }

                setSelectedServices([...selectedServices, newCategoryItem]);
            }
        }
        else {
            const categoryItem = {
                category: selectedCategory,
                service: [item],
            }

            setSelectedServices([...selectedServices, categoryItem]);
        }
    };


    async function showPaymentPopup() {
        if (paymentPopup) {
            return true;
        } else {
            bottomSheetRef.current.open();
            return false;
        }
    }

    async function onSelectedCategories() {
        const output = selectedServices.map((item: any) => ({
            category_id: item.category.id,
            sub_category_ids: item.service.map((e: any) => e.id),
        }));
        const params = {
            services: output
        }
        try {
            setLoading(true);
            const result = await API.Instance.post(API.API_ROUTES.onSendCategoryIds, params);
            if (result.status) {
                props.navigation.goBack();
                SHOW_TOAST(result?.data?.message, 'success')
            } else {
                SHOW_TOAST(result?.data?.message, 'error')
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
                    {selectedCategory ? STRING.select_a_service : STRING.select_a_category}
                </Text>
                <Text size={getScaleSize(16)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._939393}
                    style={{ marginBottom: getScaleSize(24) }}>
                    {selectedCategory ?
                        STRING.thank_you_for_choosing_a_category_Now_select_the_services_you_want_to_provide_within_this_category
                        :
                        STRING.choose_a_category_that_best_matches_your_services_This_helps_us_connect_you_with_the_right_clients
                    }
                </Text>
                <CategoryDropdown
                    onChange={(item) => {
                        // if (selectedServices.length > 0) {
                        //     const categoryItem = selectedServices.find((e: any) => e?.category?.id === selectedCategory?.id);
                        //     if (categoryItem) {
                        //         bottomSheetRef.current.open();
                        //     } else {
                        //         setSelectedCategory(item);
                        //         getSubCategoryData(item?.id);
                        //     }
                        // } else {
                        //     setSelectedCategory(item);
                        //     getSubCategoryData(item?.id);
                        // }

                        setSelectedCategory(item);
                        getSubCategoryData(item?.id);

                    }}
                    selectedItem={selectedCategory}
                    container={{}}
                    data={allCategories}
                />
                {selectedCategory && (
                    <View style={styles(theme).divider} />
                )}
                <View style={{ flex: 1.0 }}>
                    {selectedCategory && (
                        <FlatList
                            data={subCategoryList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item: any, index: number) => index.toString()}
                            renderItem={({ item, index }) => {
                                const isSelected = isServiceSelected(item);
                                return (
                                    <ServiceItem
                                        item={item}
                                        itemContainer={styles(theme).itemContainer}
                                        isSelectedBox={true}
                                        isSelected={isSelected}
                                        onPress={(e: any) => {
                                            onSelectServices(e);
                                        }}
                                    />

                                )
                            }}
                        />
                    )}
                </View>
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
                        if(isFromManageServices){
                            onSelectedCategories();
                        }else{
                            props.navigation.navigate(SCREENS.ReviewServices.identifier);
                        }
                    }}
                />
            </View>
            <BottomSheet
                bottomSheetRef={bottomSheetRef}
                height={getScaleSize(350)}
                type="payment"
                title={STRING.want_to_add_more_service_categories}
                description={STRING.additional_category_you_add_will_incur_a_monthly_fee_of}
                buttonTitle={STRING.proceed_to_pay}
                secondButtonTitle={STRING.No}
                onPressButton={() => {
                    setPaymentPopup(true);
                    bottomSheetRef.current.close();
                }}
                onPressSecondButton={() => {
                    bottomSheetRef.current.close();
                }}
            />
        </View>
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
            marginBottom: getScaleSize(16)
        },
        divider: {
            height: 1,
            backgroundColor: theme._D5D5D5,
            marginVertical: getScaleSize(24)
        }
    });
