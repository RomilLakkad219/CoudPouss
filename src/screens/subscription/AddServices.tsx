import { Dimensions, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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


export default function AddServices(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedServices, setSelectedServices] = useState<any>([]);


    const selectServices = (item: any) => {
        const exists = selectedServices.some((e: any) => e.id === item.id);
        if (exists) {
            setSelectedServices(
                selectedServices.filter((e: any) => e.id !== item.id),
            );
        } else {
            setSelectedServices([...selectedServices, item]);
        }
    };

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
                        setSelectedCategory(item);
                    }}
                    selectedItem={selectedCategory}
                    container={{}}
                    data={CATEGORY_DATA}
                />
                {selectedCategory && (
                    <View style={styles(theme).divider} />
                )}
                <View style={{ flex: 1.0 }}>
                    {selectedCategory && (
                        <FlatList
                            data={SERVICES_DATA}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item: any, index: number) => index.toString()}
                            renderItem={({ item, index }) => {
                                const isSelected = selectedServices.some((e: any) => e.id === item.id);
                                return (
                                    <ServiceItem
                                        item={item}
                                        itemContainer={styles(theme).itemContainer}
                                        isSelectedBox={true}
                                        isSelected={isSelected}
                                        onPress={(e: any) => {
                                            selectServices(e);
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
                        props.navigation.navigate(SCREENS.ReviewServices.identifier);
                    }}
                />
            </View>
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
