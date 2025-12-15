import { Image, ScrollView, SectionList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context'

//COMPONENTS
import { Header, TransactionItem } from '../../components';

//COMPONENTS
import { Text } from '../../components';

//CONSTANT
import { getScaleSize, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

export default function Transactions(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const DATA = [
        {
            title: { month: "September", year: "2025", total: "€2,500.89" },
            data: [{
                name: 'Jane Cooper',
                date: '20 Jan, 22:44',
                amount: '€49.89',
                status: 'Success',
                paymentMethod: 'Credit Card',
            }, {
                name: 'Jane Cooper',
                date: '20 Jan, 22:44',
                amount: '€49.89',
                status: 'Success',
                paymentMethod: 'Credit Card',
            }, {
                name: 'Jane Cooper',
                date: '20 Jan, 22:44',
                amount: '€49.89',
                status: 'Success',
                paymentMethod: 'Credit Card',
            }, {
                name: 'Jane Cooper',
                date: '20 Jan, 22:44',
                amount: '€49.89',
                status: 'Success',
                paymentMethod: 'Credit Card',
            }, {
                name: 'Jane Cooper',
                date: '20 Jan, 22:44',
                amount: '€49.89',
                status: 'Success',
                paymentMethod: 'Credit Card',
            }]
        },
        {
            title: { month: "September", year: "2025", total: "€2,500.89" },
            data: [{
                name: 'Jane Cooper',
                date: '20 Jan, 22:44',
                amount: '€49.89',
                status: 'Success',
                paymentMethod: 'Credit Card',
            }]
        },
        {
            title: { month: "September", year: "2025", total: "€2,500.89" },
            data: [{
                name: 'Jane Cooper',
                date: '20 Jan, 22:44',
                amount: '€49.89',
                status: 'Success',
                paymentMethod: 'Credit Card',
            }]
        }
    ]

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.transactions}
            />
            <View style={styles(theme).headerStyle}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {["Status", "Payment Method", "Date"].map((item: any, index: number) => {
                        return (
                            <View key={index} style={styles(theme).filterView}>
                                <Text size={getScaleSize(14)} font={FONTS.Lato.Medium} color={theme._2B2B2B}>
                                    {item}
                                </Text>
                                <Image source={IMAGES.ic_down} style={styles(theme).downIcon} />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={styles(theme).mainContainer}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={({ section }: { section: any }) => {
                        return (
                            <View style={styles(theme).sectionHeaderContainer}>
                                <View style={styles(theme).dateContainer}>
                                    <Text size={getScaleSize(16)} font={FONTS.Lato.Medium} color={theme._2C6587}>
                                        {section.title.year}
                                    </Text>
                                    <Text size={getScaleSize(24)} font={FONTS.Lato.Bold} color={theme._2C6587}>
                                        {section.title.month}
                                    </Text>
                                </View>
                                <Text size={getScaleSize(24)} font={FONTS.Lato.Bold} color={theme._2C6587}>
                                    {section.title.total}
                                </Text>
                            </View>
                        )
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TransactionItem 
                            item={item} 
                            itemContainer={styles(theme).itemContainer} />
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: theme.white,
    },
    headerStyle: {
        flexDirection: 'row',
        paddingLeft: getScaleSize(10),
        paddingRight: getScaleSize(22),
        marginTop: getScaleSize(11),
        marginBottom: getScaleSize(16),
    },
    filterView: {
        borderRadius: getScaleSize(4),
        borderWidth: 1,
        borderColor: theme._DCDDDD,
        paddingHorizontal: getScaleSize(16),
        paddingVertical: getScaleSize(10),
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: getScaleSize(12),
    },
    downIcon: {
        width: getScaleSize(18),
        height: getScaleSize(18),
        marginLeft: getScaleSize(10),
    },
    mainContainer: {
        flex: 1.0,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme._EAF0F3,
        paddingVertical: getScaleSize(13),
        paddingHorizontal: getScaleSize(22),
        marginTop: getScaleSize(20),
        marginBottom: getScaleSize(12),
    },
    dateContainer: {
        flex: 1.0
    },
    itemContainer:{
        marginHorizontal: getScaleSize(22),
        marginVertical: getScaleSize(12),
    }
})