import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

//COMPONENTS
import { BottomSheet, Button, Header, ProgressView, ServiceItem, Text } from '../../components';
import { SCREENS } from '..';
import { API } from '../../api';
import { useIsFocused } from '@react-navigation/native';


export default function ManageServices(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();
    const bottomSheetRef = useRef<any>(null);
    const { profile } = useContext<any>(AuthContext);

    const [selectedService, setSelectedService] = useState<any>(null);
    const [isLoading, setLoading] = useState(false);
    const [services, setServices] = useState<any>([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getServices();
        }
    }, [isFocused]);

    async function getServices() {
        try {
            setLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.getAllService);
            if (result.status) {
                console.log('result==>', result?.data?.data)
                setServices(result?.data?.data ?? []);
                setSelectedService(result?.data?.data?.services?.[0] ?? null);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error')
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
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
                screenName={STRING.manage_services}
            />
            <View style={styles(theme).mainContainer}>
                <Text
                    size={getScaleSize(18)}
                    font={FONTS.Lato.Medium}
                    color={theme._737373}
                    style={{ marginHorizontal: getScaleSize(24) }}>
                    {STRING.here_you_can_easily_manage_your_service_categories_each_additional_category_you_add_will_incur_a_monthly_fee_of}
                </Text>
                <View style={styles(theme).divider} />
                <View style={styles(theme).serviceContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {(services?.services ?? []).map((item: any, index: number) => {
                            const isSelected = selectedService.category_id === item.category_id;
                            const isLast = index === (services.length - 1);
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedService(item);
                                    }}
                                    style={[styles(theme).serviceItemContainer, {
                                        marginLeft: index == 0 ? getScaleSize(24) : getScaleSize(16),
                                        marginRight: isLast ? getScaleSize(24) : 0,
                                        backgroundColor: isSelected ? theme._2C6587 : theme._F7F7F7,
                                    }
                                    ]}>
                                    <Image
                                        source={IMAGES.ic_hammer_wrench}
                                        style={[styles(theme).itemIcon, {
                                            tintColor: isSelected ? theme.white : theme._C1C1C1
                                        }]} />
                                    <Text
                                        size={getScaleSize(16)}
                                        font={FONTS.Lato.SemiBold}
                                        color={isSelected ? theme.white : theme._818285}>
                                        {item?.category_name ?? ''}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={{ marginVertical: getScaleSize(24), flex: 1 }}>
                    <FlatList
                        data={selectedService?.subcategories ?? []}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <ServiceItem
                                    item={item}
                                    itemContainer={styles(theme).itemContainerStyle}
                                    isManage={true}
                                    onPress={() => {
                                        setSelectedService(item);
                                    }}
                                />
                            )
                        }}
                    />
                </View>
            </View>
            <Button
                title={STRING.add_more_services}
                style={{ marginHorizontal: getScaleSize(24), marginBottom: getScaleSize(24) }}
                onPress={() => {
                    if (profile?.user?.service_provider_type === 'professional') {
                        props.navigation.navigate(SCREENS.AddServices.identifier, {
                            isFromManageServices: true,
                        });
                    } else {
                        bottomSheetRef.current.open();
                    }
                }}
            />
            <BottomSheet
                bottomSheetRef={bottomSheetRef}
                height={getScaleSize(330)}
                addMoreServices={true}
                title={STRING.additional_category_you_add_will_incur_a_monthly_fee_of}
                description={STRING.you_are_on_Non_professional_plan_that_s_why_you_need_to_pay_to_add_more_category_of_services}
                buttonTitle={STRING.proceed}
                secondButtonTitle={STRING.cancel}
                onPressButton={() => {
                    bottomSheetRef.current.clo
                
                }}
            />
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.white },
        mainContainer: {
            flex: 1,
        },
        divider: {
            height: 1,
            backgroundColor: theme._D5D5D5,
            marginBottom: getScaleSize(24),
            marginTop: getScaleSize(18),
            marginHorizontal: getScaleSize(24),
        },
        serviceItemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: getScaleSize(10),
            paddingHorizontal: getScaleSize(12),
            borderRadius: getScaleSize(10),
        },
        serviceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemIcon: {
            width: getScaleSize(24),
            height: getScaleSize(24),
            marginRight: getScaleSize(14),
        },
        itemContainerStyle: {
            marginBottom: getScaleSize(18),
            marginHorizontal: getScaleSize(24),
        }
    })